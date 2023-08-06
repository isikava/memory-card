import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'blue.50',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: 'lg',
        colorScheme: 'teal',
      },
    },
  },
});
