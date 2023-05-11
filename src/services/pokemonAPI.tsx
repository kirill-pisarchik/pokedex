import {NamedAPIResourceList, Pokemon} from 'pokenode-ts';

const getPokemonByName = async (name:string) => {
  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon:Pokemon = await pokemonData.json();

  return pokemon;
}

const getAllPokemonNames = async () => {
  const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000');
  const pokemon:NamedAPIResourceList = await pokemonData.json();

  return pokemon.results;
}

const pokemonAPI = {
  getPokemonByName,
  getAllPokemonNames
}

export default pokemonAPI;
