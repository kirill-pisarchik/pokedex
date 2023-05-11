import cardClasses from '../UI/Card.module.css';
import React, {FC, useEffect, useState} from 'react';

import AutoSuggest from '../UI/AutoSuggestSearch';
import Card from '../UI/Card';
import type { NamedAPIResource } from 'pokenode-ts';
import pokemonAPI from '../../services/pokemonAPI';
import {SearchProps} from '../../pokedex';

const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [pokemon, setPokemon] = useState<NamedAPIResource[] | []>([]);

  const fetchAllPokemon = async () => {
    const pokemonNames = await pokemonAPI.getAllPokemonNames();

    pokemonNames.sort((a,b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });

    setPokemon(() => pokemonNames);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const onChangeValue = (value: NamedAPIResource) => {
    onSearchChange(value.name);
  }

  return <Card className={`${cardClasses.half} ${cardClasses.center}`}>
    <AutoSuggest
      label='Pokemon name'
      allSuggestions={pokemon}
      onChangeValue={onChangeValue}
    />
  </Card>

};

export default Search;
