import React from 'react';
import { Input, Flex, Text, Badge, Button, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { JobCard } from '@/components/job-card';
import { definitions } from '@/types/supabase';

const MOCK_DATA_JOBS: definitions['jobs'][] & { featured?: boolean } = [
  {
    id: 1,
    user_id: '',
    company_name: 'Mozilla',
    title: 'Snr Software Engineer',
    description:
      'Use your backend software development skills for good, and have a real impact on the work of millions of people who use the platform.',
    created_at: '',
    expires_on: '',
    salary_type: 'annual_package',
    updated_at: '',
    work_type: 'contract_temp',
    company_email: '',
    company_number: '',
    salary_max: 12500000,
    salary_min: 9500000,
    featured: true,
  },
  {
    id: 2,
    user_id: '',
    company_name: 'Soul Burger',
    title: 'Chef',
    description: 'Use your culinary skills to bring vegan food to Randwick!',
    created_at: '',
    expires_on: '',
    salary_type: 'hourly',
    updated_at: '',
    work_type: 'casual',
    company_email: '',
    company_number: '',
    salary_max: 9500,
    salary_min: 7500,
  },
  {
    id: 3,
    user_id: '',
    company_name: 'seedlet',
    title: 'Snr Backend Engineer',
    description:
      'Use your backend software development skills for good, and go home with a warm feeling about it.',
    created_at: '',
    expires_on: '',
    salary_type: 'annual_package',
    updated_at: '',
    work_type: 'casual',
    company_email: '',
    company_number: '',
    salary_max: 12500000,
    salary_min: 9500000,
  },
];

function Index() {
  return (
    <>
      <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mt={4}
        pt={12}
        pb={12}
        height={350}
      >
        <Flex
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          mb={2}
        >
          <Text fontSize="3xl" fontWeight="bold" color="teal.500">
            seedlet
          </Text>
          <Badge variant="subtle" colorScheme="pink" ml={1}>
            ALPHA
          </Badge>
        </Flex>
        <Text color="gray.500">The Ethical Job Search</Text>
      </Flex>
      <Flex justifyContent="center" backgroundColor="gray.100" pt={12} pb={12} flexDirection="row">
        <Flex
          flexDirection="column"
          height={300}
          width="100%"
          maxWidth={970}
          justifyContent="center"
        >
          <Text color="blackAlpha.600" mb={4}>
            Find the right fit.
          </Text>
          <Flex overflow="visible">
            <Input
              placeholder="Job Title, Keywords"
              size="lg"
              isFullWidth
              variant="outline"
              color="gray.500"
              backgroundColor="white"
            />
            <Input placeholder="Location" size="lg" isFullWidth backgroundColor="white" />
            <Button
              variant="solid"
              size="lg"
              leftIcon={<SearchIcon />}
              pl={4}
              pr={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minWidth={120}
              backgroundColor="teal.500"
              color="white"
            >
              Search
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          pl={8}
          pr={8}
          pt={12}
          pb={12}
        >
          <Flex alignItems="center" maxWidth={1200} display="flex" flexDirection="row" mb={8}>
            <Heading size="xl" color="teal">
              Featured Jobs
            </Heading>
          </Flex>
          <Flex flexDirection="column">
            {MOCK_DATA_JOBS.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Index;
