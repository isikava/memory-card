import {
  Box,
  Container,
  Button,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { PokemonsList } from './PokemonsList';
import { Scoreboard } from './Scoreboard';
import { StartScreen } from './StartScreen';
import { GameoverModal } from './GameoverModal';
import { POKEMONS } from '../constants';
import { api } from '../api';

export const Main = () => {
  const [status, setStatus] = useState<Status>('start');
  const [score, setScore] = useState(0);

  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // visited card map
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
        <VStack align='center'>
          {status === 'start' && <StartScreen onStart={startGame} />}

          {status !== 'start' && (
            <>
              {isLoading && <Spinner />}
              {error && <Text>{error}</Text>}
              {!isLoading && !error && (
                <>
                  <Scoreboard score={score} />
                  <PokemonsList pokemons={pokemons} onPlay={handlePlay} />
                  <Button onClick={startGame}>Restart</Button>
                </>
              )}
            </>
          )}

          {(status === 'win' || status === 'lose') && (
            <GameoverModal
              onRestart={startGame}
              score={score}
              status={status}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
};
