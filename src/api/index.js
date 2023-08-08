import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});

const getPokemon = async (query) => {
  try {
    const res = await instance.get(query);
    const { data } = res;
    const pokemon = {
      name: data.name,
      img: data.sprites.front_default,
    };
    return pokemon;
  } catch (err) {
    console.error(err);
    throw err.response.data;
  }
};

const getPokemons = async (names) => {
  const requests = names.map((name) => getPokemon(name));
  return Promise.all(requests);
};

export const api = {
  getPokemon,
  getPokemons,
};
