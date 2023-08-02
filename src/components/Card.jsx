import { Card as ChCard, CardBody, Image, Heading } from '@chakra-ui/react';

export const Card = ({ pokemon, onClick }) => {
  return (
    <ChCard cursor='pointer' onClick={onClick}>
      <CardBody align='center'>
        <Image src={pokemon.img} w={['100%', '200px']} objectFit='cover' />
        <Heading size='md'>{pokemon.name}</Heading>
      </CardBody>
    </ChCard>
  );
};
