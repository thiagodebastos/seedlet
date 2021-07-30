import React from 'react';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult
} from 'next';
import { JobCard } from '@/components/job-card';
import { Job } from '@/components/job-card/types';
import { MOCK_DATA_JOBS } from '@/utils/dummy-data';
import { Container, Flex } from '@chakra-ui/react';

export type Props = {
  job: Job;
};

export default function JobDetailPage({ job }: Props) {
  return (
    <Container>
      <JobCard job={job} />
    </Container>
  );
}

export function getStaticProps(
  context: GetStaticPropsContext
): GetStaticPropsResult<Props> {
  const id = context.params!.id;

  if (Number(id) === NaN) {
    throw Error;
  }

  const job = MOCK_DATA_JOBS[Number(id)];

  return {
    props: {
      job
    }
  };
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export function getStaticPaths(
  context: GetStaticPathsContext
): GetStaticPathsResult {
  const paths = MOCK_DATA_JOBS.map((job) => ({
    params: { id: String(job.id) }
  }));

  return {
    paths,
    fallback: false
  };
}
