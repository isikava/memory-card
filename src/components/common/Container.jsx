import { Container as ChakraContainer } from '@chakra-ui/react';

export const Container = ({ children }) => {
  return <ChakraContainer maxW='1200px'>{children}</ChakraContainer>;
};
