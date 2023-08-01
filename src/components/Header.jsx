import { Box, Heading } from '@chakra-ui/react';
import { Container } from './common/Container';

export const Header = () => {
  return (
    <Box as='header'>
      <Container>
        <Heading as='h1'>Memory Card</Heading>
      </Container>
    </Box>
  );
};
