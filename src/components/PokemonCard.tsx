import { Card, CardBody, Image, Heading } from '@chakra-ui/react';

type Props = {
  pokemon: IPokemon;
  onClick: () => void;
};

export const PokemonCard = ({ pokemon, onClick }: Props) => {
  return (
    <Card cursor='pointer' onClick={onClick}>
      <CardBody>
        <Image src={pokemon.img} w={['100%', '200px']} objectFit='cover' />
        <Heading size='md'>{pokemon.name}</Heading>
      </CardBody>
    </Card>
  );
};
