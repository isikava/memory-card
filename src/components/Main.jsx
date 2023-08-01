import { Box, Image } from '@chakra-ui/react';
import { Container } from './common/Container';
import { useEffect, useState } from 'react';
import { getPokemon, getPokemons } from '../api/getPokemon';

const POKEMONS = ['pikachu', 'bulbasaur', 'charmander', '5', '6'];

export const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPokes = async () => {
      setIsLoading(true);
      try {
        const data = await getPokemons(POKEMONS);
        setPokemons(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getPokes();
  }, []);

  return (
    <Box as='main'>
      <Container>
        {isLoading && <div>Loading...</div>}
        {pokemons.length > 0 &&
          pokemons.map((p) => (
            <Box key={p.name}>
              <Image src={p.img}></Image>
              <div>{p.name}</div>
            </Box>
          ))}
        {error && <Box> {error} </Box>}
      </Container>
    </Box>
  );
};
