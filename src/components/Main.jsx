import { Box, Stack, Image, Grid } from '@chakra-ui/react';
import { Container } from './common/Container';
import { useEffect, useState } from 'react';
import { getPokemons } from '../api/fetchPokemon';
import { Scoreboard } from './Scoreboard';
import { Card } from './Card';

const POKEMONS = ['pikachu', 'bulbasaur', 'charmander', '5', '6'];

const DATA = [
  {
    name: 'pikachu',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    name: 'bulbasaur',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    name: 'charmander',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    name: 'charmeleon',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  },
  {
    name: 'charizard',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
];

export const Main = () => {
  const [pokemons, setPokemons] = useState(DATA);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPokes = async () => {
      setIsLoading(true);
      try {
        const data = await getPokemons(POKEMONS);
        console.log(data);
        setPokemons(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    // getPokes();
  }, []);

  return (
    <Box as='main'>
      <Container>
        <Scoreboard />
        <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={6}>
          {pokemons.length > 0 &&
            pokemons.map((p) => (
              <Card
                key={p.name}
                pokemon={p}
                onClick={() => console.log(p.name)}
              />
            ))}
        </Grid>
        {isLoading && <div>Loading...</div>}
        {error && <Box> {error} </Box>}
      </Container>
    </Box>
  );
};
