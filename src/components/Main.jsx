import { Box, Stack, Image, Grid, Button, Text } from '@chakra-ui/react';
import { Container } from './common/Container';
import { useEffect, useRef, useState } from 'react';
import { getPokemons } from '../api/fetchPokemon';
import { Scoreboard } from './Scoreboard';
import { Card } from './Card';

const STATUS = {
  START: 'start',
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose',
};

const POKEMONS = [
  'pikachu',
  'bulbasaur',
  'squirtle',
  'charizard',
  'jigglypuff',
];

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
    name: 'squirtle',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    name: 'charizard',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  {
    name: 'jigglypuff',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
  },
];

export const Main = () => {
  const [status, setStatus] = useState(STATUS.START);
  const [score, setScore] = useState(0);
  const [pokemons, setPokemons] = useState(DATA);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(status);

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
    // if (isWin || status === STATUS.LOSE) return;

    // if the card was visited
    if (visitedRef.current[name]) {
      // lose, end game
      console.log('visited');
      stopGame();
    } else {
      // shuffle cards
      visitedRef.current[name] = true;
      console.log(visitedRef.current);
      shufflePokemons();
      setScore(score + 1);
    }
  };

  return (
    <Box as='main'>
      <Container>
        {status === STATUS.START && (
          <Box>
            <Text>Start the game?</Text>
            <Button onClick={startGame}>Start</Button>
          </Box>
        )}

        {status !== STATUS.START && (
          <>
            <Scoreboard score={score} />
            <Grid
              templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
              gap={6}
              mb={4}
            >
              {pokemons.length > 0 &&
                pokemons.map((p) => (
                  <Card
                    key={p.name}
                    pokemon={p}
                    onClick={() => handlePlay(p.name)}
                  />
                ))}
            </Grid>

            <Box>
              {status === STATUS.WIN && <Text>Its a Win! </Text>}
              {status === STATUS.LOSE && <Text>Lost... </Text>}

              <Button onClick={startGame}>Restart</Button>
            </Box>
          </>
        )}

        {isLoading && <div>Loading...</div>}
        {error && <Box> {error} </Box>}
      </Container>
    </Box>
  );
};
