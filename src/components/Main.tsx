import { Box, Container, Grid, Button, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Scoreboard } from './Scoreboard';
import { PokemonCard } from './PokemonCard';
import { StartScreen } from './StartScreen';
import { GameoverModal } from './GameoverModal';
import { POKEMONS } from '../constants';
//@ts-ignore
import { api } from '../api';

export const Main = () => {
  const [status, setStatus] = useState<Status>('start');
  const [score, setScore] = useState(0);

  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visitedRef = useRef<Record<string, boolean>>({});

  const isWin = score >= 5;
  if (isWin && status !== 'win') {
    setStatus('win');
  }

  useEffect(() => {
    const getPokemons = async () => {
      setIsLoading(true);
      try {
        const data = await api.getPokemons(POKEMONS);
        setPokemons(data);
      } catch (err) {
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemons();
  }, []);

  const shufflePokemons = () => {
    let temp = [...pokemons];

    for (let i = temp.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    setPokemons(temp);
  };

  const startGame = () => {
    setStatus('playing');
    setScore(0);
    visitedRef.current = {};
    shufflePokemons();
  };

  const stopGame = () => {
    setStatus('lose');
  };

  const handlePlay = (name: string) => {
    if (status !== 'playing') return;

    // if the card was visited
    if (visitedRef.current[name]) {
      // lose, end game
      stopGame();
    } else {
      // shuffle cards
      visitedRef.current[name] = true;
      shufflePokemons();
      setScore(score + 1);
    }
  };

  return (
    <Box as='main' p={4}>
      <Container maxW='1200px'>
        {status === 'start' && <StartScreen onStart={startGame} />}

        {status !== 'start' && (
          <>
            <Scoreboard score={score} />
            <Grid
              templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
              gap={6}
              mb={4}
            >
              {isLoading && <Spinner />}
              {error && <Text> {error} </Text>}
              {pokemons.length > 0 &&
                pokemons.map((p) => (
                  <PokemonCard
                    key={p.name}
                    pokemon={p}
                    onClick={() => handlePlay(p.name)}
                  />
                ))}
            </Grid>
            <Button onClick={startGame}>Restart</Button>
          </>
        )}
        {(status === 'win' || status === 'lose') && (
          <GameoverModal onRestart={startGame} score={score} status={status} />
        )}
      </Container>
    </Box>
  );
};
