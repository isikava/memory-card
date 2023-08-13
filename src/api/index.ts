import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});

const getPokemon = async (query: string): Promise<IPokemon> => {
  try {
    const { data } = await instance.get(query);

    const pokemon = {
      name: data.name,
      img: data.sprites.front_default,
    };

    return pokemon;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err);
      throw err.response?.data;
    } else {
      console.error(err);
      throw 'Unexpected error';
    }
  }
};

const getPokemons = async (names: string[]) => {
  const requests = names.map((name) => getPokemon(name));
  return Promise.all(requests);
};

export const api = {
  getPokemon,
  getPokemons,
};
