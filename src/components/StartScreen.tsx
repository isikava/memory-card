import { Box, Text, Button } from '@chakra-ui/react';

type Props = {
  onStart: () => void;
};

export const StartScreen = ({ onStart }: Props) => {
  return (
    <Box>
      <Text fontSize='2xl' mb={4}>
        Start the game?
      </Text>
      <Button onClick={onStart}>Start</Button>
    </Box>
  );
};
