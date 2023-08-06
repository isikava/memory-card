import { Box, Heading, Container } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box as='header' p={4}>
      <Container maxW='1200px' align='center'>
        <Heading as='h1'>Memory Card</Heading>
      </Container>
    </Box>
  );
};
