import React, {FC, useEffect, useMemo, useState} from 'react';
import Card from '../UI/Card';
import classes from './PokemonCard.module.css';
import {ChainLink, EvolutionChain, PokemonSpecies} from 'pokenode-ts';
import PokemonEvolution from './PokemonEvolution';
import {ChainLinkGrid, ChainLinkRow, PokemonCardProps} from '../../pokedex';

const convertToGrid = (node:ChainLink , array: ChainLinkGrid, x: number = 0) => {
  if (!node) {
    return;
  }

  const currentRow:ChainLinkRow = array[array.length - 1];
  currentRow[x] = node.species.name;
  let i = x - 1;
  while (i >= 0 && currentRow[i] === undefined) {
    currentRow[i] = null;
    i--;
  }

  node.evolves_to.forEach((childNode, index) => {
    if (index > 0) {
      array.push([]);
    }
    convertToGrid(childNode, array, x + 1);
  });
}

const PokemonCard:FC<PokemonCardProps>  = ({ pokemon, onSelectEvolution }) => {
  const [evolution, setEvolution] = useState<EvolutionChain|null>(null);
  const [apiError, setApiError] = useState<boolean>(false);
  const [evolutionUrl, setEvolutionUrl] = useState<string>();

  const fetchSpecies = async (speciesUrl: string) => {
    const speciesData = await fetch(speciesUrl);
    const species:PokemonSpecies = await speciesData.json();

    setEvolutionUrl(() => species.evolution_chain.url);
  };

  const fetchEvolution = async (evolutionUrl: string) => {
    const evolutionData = await fetch(evolutionUrl);
    const evolution:EvolutionChain = await evolutionData.json();

    setEvolution(() => evolution);
  };

  const pokemonId = pokemon ? pokemon.id : null;
  const evolutionId = evolution && evolution.id;

  useEffect(() => {
    setApiError(false);
    if (!pokemon || !pokemon.species.url) {
      return;
    }
    fetchSpecies(pokemon.species.url).catch(() => {
      setApiError(true);
    });
  }, [pokemonId]);

  useEffect(() => {
    setApiError(false);
    if (!evolutionUrl) {
      return;
    }

    fetchEvolution(evolutionUrl).catch(() => {
      setApiError(true);
    });

    return () => {
      setEvolution(() => null);
    }
  }, [evolutionUrl]);

  const pokemonInfo = useMemo(() => (<>
    <h1>Name: {pokemon?.name}</h1>
    <h4>Health: {pokemon?.stats.filter(stat => stat.stat.name === 'hp')[0].base_stat}</h4>
    <h2>Abilities</h2>
    <h3>Abilities</h3>
    <ul>{pokemon?.abilities.map(ability => (
      <li key={ability.ability.name}>{ability.ability.name}</li>
    ))}</ul>
  </>), [pokemonId]);

  //  const evolutionChain: (NamedAPIResource|null)[][] =
  const evolutionChain: ChainLinkGrid = useMemo(() => {
    if (!evolutionId) {
      return [];
    }
    const chain = [[]];
    let head: ChainLink = {...evolution.chain};
    convertToGrid(head, chain);

    return chain;
  }, [evolutionId]);

  const pokemonEvolution = useMemo(() => {
    if (!evolution || !pokemon || !pokemon.name) {
      return (<></>);
    }
    if (apiError) {
      return (<p>No evolution found :(</p>);
    }
    return (
      <PokemonEvolution
        evolutionChain={evolutionChain}
        pokemonName={pokemon.name}
        onClickEvolutionStage={onSelectEvolution}
      />
    );
  }, [evolutionId, pokemonId]);

  const messageNoPokemon = <p>Please catch/search the pokemon first</p>;

  return (
    <section className={classes.pokemon}>
      <Card>
        { pokemon ? pokemonInfo : messageNoPokemon }
        { pokemon && evolution && pokemonEvolution }
      </Card>
    </section>
  );

};

export default PokemonCard;
