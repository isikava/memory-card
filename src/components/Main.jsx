import { Box, Container, Grid, Button, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Scoreboard } from './Scoreboard';
import { PokemonCard } from './PokemonCard';
import { StartScreen } from './StartScreen';
import { GameoverModal } from './GameoverModal';
import { STATUS, POKEMONS, DATA } from '../constants';
import { getPokemons } from '../api';

export const Main = () => {
  const [status, setStatus] = useState(STATUS.START);
  const [score, setScore] = useState(0);

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const visitedRef = useRef({});

  const isWin = score >= 5;
  if (isWin && status !== STATUS.WIN) {
    setStatus(STATUS.WIN);
  }

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

  const shufflePokemons = () => {
    let temp = [...pokemons];

    for (let i = temp.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    setPokemons(temp);
  };

  const startGame = () => {
    setStatus(STATUS.PLAYING);
    setScore(0);
    visitedRef.current = {};
    shufflePokemons();
  };

  const stopGame = () => {
    setStatus(STATUS.LOSE);
  };

  const handlePlay = (name) => {
    if (status !== STATUS.PLAYING) return;

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
      <Container maxW='1200px' align='center'>
        {status === STATUS.START && <StartScreen onStart={startGame} />}

        {status !== STATUS.START && (
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
        {(status === STATUS.WIN || status === STATUS.LOSE) && (
          <GameoverModal onRestart={startGame} score={score} status={status} />
        )}
      </Container>
    </Box>
  );
};
