import React from 'react';
import Link from 'next/link';
import { Image, Text, Flex, Box, Badge, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Job } from './types';

export type Props = {
  job: Job & { featured?: boolean };
};

export function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job.id}`} passHref>
      <ChakraLink
        _hover={{ backgroundColor: 'teal.50' }}
        borderWidth={job.featured ? 2 : 'none'}
        borderColor={job.featured ? 'teal.100' : 'none'}
        backgroundColor={job.featured ? 'teal.50' : 'gray.50'}
        borderRadius={8}
        mb={4}
      >
        <Flex
          flexDirection="row"
          maxWidth={970}
          justifyContent="center"
          alignItems="center"
          mb={8}
          p={4}
          width="100%"
        >
          <Image
            height="100px"
            width="100px"
            src="https://cdn.pixabay.com/photo/2016/08/23/15/11/avocado-1614699_960_720.png"
            alt="company logo"
          />
          <Box ml={8} width="100%">
            <Flex flexDirection="row" alignItems="center">
              <Text fontSize="2xl" fontWeight="bold">
                {job.company_name}
              </Text>
              {job.featured && (
                <Badge
                  variant="subtle"
                  color="teal"
                  backgroundColor="teal.100"
                  ml={2}
                  p={1}
                  borderRadius={4}
                >
                  FEATURED
                </Badge>
              )}
            </Flex>
            <Flex width="100%" justifyContent="space-between">
              <Text mt={4} fontSize="lg">
                {job.description}
              </Text>
              {/* <Button variant="solid" size="md">
              Apply
            </Button> */}
            </Flex>
          </Box>
        </Flex>
      </ChakraLink>
    </Link>
  );
}
