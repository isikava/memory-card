import { Box, Text } from '@chakra-ui/react';

export const Scoreboard = ({ score }: { score: number }) => {
  return (
    <Box mb={4}>
      <Text as='b' fontSize='2xl'>
        SCORE: {score}{' '}
      </Text>
    </Box>
  );
};
