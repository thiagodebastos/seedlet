import React, { useState, MouseEvent } from 'react';
import { Input, Flex, Text, Badge, Button, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { JobCard } from '@/jobs/';
import { MOCK_DATA_JOBS } from '@/utils/dummy-data';
import { Job } from '@/components/job-card/types';

function Hero() {
  return (
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
  );
}

function Search() {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobLocation, setJobLocation] = useState<string>('');

  function handleSubmitSearch(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  return (
    <Flex
      justifyContent="center"
      backgroundColor="teal.100"
      height={300}
      mb={6}
      flexDirection="row"
    >
      <Flex
        flexDirection="column"
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
            backgroundColor="white"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.currentTarget.value)}
          />
          <Input
            placeholder="Location"
            size="lg"
            backgroundColor="white"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.currentTarget.value)}
          />
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
            onClick={handleSubmitSearch}
          >
            Search
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export type JobListProps = {
  jobs: Job[];
};
function JobList({ jobs }: JobListProps) {
  return (
    <Flex flexDirection="column">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Flex>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <Search />
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          maxWidth={1200}
          display="flex"
          flexDirection="row"
          mb={8}
        >
          <Heading size="xl" color="teal">
            Featured Jobs
          </Heading>
        </Flex>
        <JobList jobs={MOCK_DATA_JOBS} />
      </Flex>
    </>
  );
}

export default Index;
