import classes from './App.module.css';
import React, {useEffect, useState} from 'react';
import Header from './components/Layout/Header';
import Search from './components/Search/Search';
import PokemonCard from './components/Pokemon/PokemonCard';
import {Pokemon} from 'pokenode-ts';
import pokemonAPI from './services/pokemonAPI';
import SearchHistory from './components/Search/SearchHistory';

function App() {
  const [pokemonCurrent, setPokemonCurrent] = useState<Pokemon | undefined>()
  const [pokemonName, setPokemonName] = useState<string | undefined>()
  const [lastFoundName, setLastFoundName] = useState<string | undefined>()

  const fetchPokemonByName = async (name: string | undefined) => {
    if (!name) {
      return;
    }

    const pokemon = await pokemonAPI.getPokemonByName(name);
    setPokemonCurrent(() => pokemon);
  };

  useEffect(() => {
    fetchPokemonByName(pokemonName);
  }, [pokemonName]);

  const handlePokemonChange = (pokemonName: string) => {
    setPokemonName(() => pokemonName);
  };

  const handlePokemonSearchChange = (pokemonName: string) => {
    setLastFoundName(() => pokemonName);
    handlePokemonChange(pokemonName);
  };

  return (
    <div className={classes.App}>
      <Header/>
      <main className={classes.main}>
        <Search onSearchChange={handlePokemonSearchChange}/>
        <PokemonCard
          pokemon={pokemonCurrent}
          onSelectEvolution={handlePokemonChange}/>
      </main>
      <aside>
        <SearchHistory
          pokemonName={lastFoundName}
          onSelectHistoryItem={handlePokemonChange}>
        </SearchHistory>
      </aside>
    </div>

  );
}

export default App;
