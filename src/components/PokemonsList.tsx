import { Grid } from '@chakra-ui/react';
import { PokemonCard } from './PokemonCard';

type Props = {
  pokemons: IPokemon[];
  onPlay: (name: string) => void;
};

export const PokemonsList = ({ pokemons, onPlay }: Props) => {
  return (
    <Grid
      templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
      gap={6}
      mb={4}
      alignSelf='stretch'
    >
      {pokemons.length > 0 &&
        pokemons.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            onClick={() => onPlay(p.name)}
          />
        ))}
    </Grid>
  );
};
