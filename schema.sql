--
-- CLEANUP
--
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;


--
-- TYPES
--

CREATE TYPE public.pricing_plan_interval AS ENUM (
    'day',
    'week',
    'month',
    'year'
);

CREATE TYPE public.pricing_type AS ENUM (
    'one_time',
    'recurring'
);

CREATE TYPE public.salary_type AS ENUM (
    'annual_package',
    'anual_commission',
    'comission_only',
    'hourly',
    'project'
);

CREATE TYPE public.subscription_status AS ENUM (
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid'
);

CREATE TYPE public.work_type AS ENUM (
    'casual',
    'contract_temp',
    'full_time',
    'part_time',
    'project'
);


--
-- FUNCTIONS
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.app_users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


--
-- TABLES
--

CREATE TABLE public.app_users (
    id uuid NOT NULL PRIMARY KEY,
    full_name text,
    avatar_url text,
    billing_address jsonb,
    payment_method jsonb
);

CREATE TABLE public.customers (
    id uuid NOT NULL PRIMARY KEY,
    stripe_customer_id text
);

CREATE TABLE public.jobs (
    id bigint GENERATED ALWAYS AS IDENTITY,
    user_id uuid,
    subscription_id text,
    company_name text NOT NULL,
    company_email text,
    company_number text,
    title text NOT NULL,
    description text NOT NULL,
    salary_type public.salary_type NOT NULL,
    work_type public.work_type NOT NULL,
    salary_min smallint,
    salary_max smallint,
    created timestamp with time zone DEFAULT now() NOT NULL,
    updated timestamp with time zone DEFAULT now() NOT NULL,
    expires timestamp with time zone DEFAULT (now() + '30 days'::interval) NOT NULL,
    fullfilled timestamp with time zone,

    UNIQUE (user_id, subscription_id)

);

-- SYNC WITH STRIPE
CREATE TABLE public.stripe_products (
    id text PRIMARY KEY,
    active boolean,
    name text,
    description text,
    image text,
    metadata jsonb,
    UNIQUE (id)
);

-- SYNC WITH STRIPE
CREATE TABLE public.stripe_prices (
    id text PRIMARY KEY,
    product_id text,
    active boolean,
    description text,
    unit_amount bigint,
    currency text CHECK (char_length(currency) = 3),
    type public.pricing_type,
    "interval" public.pricing_plan_interval,
    interval_count integer,
    trial_period_days integer,
    metadata jsonb,

    UNIQUE (id)
);

-- SYNC WITH STRIPE
CREATE TABLE public.stripe_subscriptions (
    id text UNIQUE NOT NULL,
    user_id uuid NOT NULL,
    status public.subscription_status,
    metadata jsonb,
    price_id text,
    quantity integer,
    cancel_at_period_end boolean,
    created timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    current_period_start timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    current_period_end timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    ended_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    cancel_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    canceled_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    trial_start timestamp with time zone DEFAULT timezone('utc'::text, now()),
    trial_end timestamp with time zone DEFAULT timezone('utc'::text, now())
);


--
-- REFERENCE CONSTRAINTS
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_users(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.stripe_subscriptions(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.stripe_prices
    ADD CONSTRAINT stripe_prices_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.stripe_products(id);

ALTER TABLE ONLY public.stripe_subscriptions
    ADD CONSTRAINT stripe_subscriptions_price_id_fkey FOREIGN KEY (price_id) REFERENCES public.stripe_prices(id);

ALTER TABLE ONLY public.stripe_subscriptions
    ADD CONSTRAINT stripe_subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);

--
-- TRIGGERS
--

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON public.jobs
    FOR EACH ROW
      EXECUTE FUNCTION public.trigger_set_timestamp();

--
-- SECURITY
--

-- TODO jobs policies

-- PRICES
CREATE POLICY "Allow public read-only access." ON public.stripe_prices FOR SELECT USING (true);

-- PRODUCTS
CREATE POLICY "Allow public read-only access." ON public.stripe_products FOR SELECT USING (true);

-- SUBSCRIPTIONS
CREATE POLICY "Can only view own subs data." ON public.stripe_subscriptions FOR SELECT USING ((auth.uid() = user_id));

-- APP_USERS
CREATE POLICY "Can update own user data." ON public.app_users FOR UPDATE USING ((auth.uid() = id));

CREATE POLICY "Can view own user data." ON public.app_users FOR SELECT USING ((auth.uid() = id));


ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;
