import { Box, Text, Button } from '@chakra-ui/react';

export const StartScreen = ({ onStart }) => {
  return (
    <Box>
      <Text fontSize='2xl' mb={4}>
        Start the game?
      </Text>
      <Button onClick={onStart}>Start</Button>
    </Box>
  );
};
