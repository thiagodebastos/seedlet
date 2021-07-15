import React from 'react';
import { Image, Text, Flex, Box, Badge, Button, Link } from '@chakra-ui/react';
import { definitions } from '@/types/supabase';

type Job = definitions['jobs'] & {
  featured?: boolean;
};

export function JobCard({ featured, ...job }: Job) {
  return (
    <Link href="job.application_url" _hover={{ backgroundColor: 'teal.50' }}>
      <Flex
        flexDirection="row"
        maxWidth={970}
        justifyContent="center"
        alignItems="center"
        mb={8}
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
            {featured && (
              <Badge
                variant="subtle"
                color="white"
                backgroundColor="teal.300"
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
    </Link>
  );
}
