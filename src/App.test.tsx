import React, {FC} from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils'

import App from './App';
import {PokemonCardProps, SearchHistoryProps, SearchProps} from './pokedex';
import pokemonAPI from './services/pokemonAPI';
import {Pokemon} from 'pokenode-ts';

let onSearchChangeReference: Function;
let onSelectEvolutionReference: Function;
let onSelectHistoryItemReference: Function;
let pokemonReference: Pokemon | undefined;
let pokemonNameReference: string | undefined;

jest.mock('./components/Layout/Header', () => () => {
  return <div data-testid='Header'/>;
});

jest.mock('./components/Search/Search', () => {
  const ComponentToMock: FC<SearchProps> = ({ onSearchChange }) => {
    onSearchChangeReference = onSearchChange;
    return <div data-testid='Search'/>;
  }
  return ComponentToMock;
});

jest.mock('./components/Pokemon/PokemonCard', () => {
  const ComponentToMock: FC<PokemonCardProps> = ({ pokemon, onSelectEvolution }) => {
    onSelectEvolutionReference = onSelectEvolution;
    pokemonReference = pokemon;
    return <div data-testid='PokemonCard'/>;
  }
  return ComponentToMock;
});

jest.mock('./components/Search/SearchHistory', () => {
  const ComponentToMock: FC<SearchHistoryProps> = ({ pokemonName, onSelectHistoryItem }) => {
    onSelectHistoryItemReference = onSelectHistoryItem;
    pokemonNameReference = pokemonName;
    return <div data-testid='SearchHistory'/>;
  }
  return ComponentToMock;
});

describe('App', () => {
  const mockPokemonItem = {name: 'pikachu'};

  beforeEach(() => {
    pokemonAPI.getPokemonByName = jest.fn().mockResolvedValue(mockPokemonItem);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders App component', () => {
    render(<App />);

    expect(screen.getByTestId('Header')).toBeDefined();
    expect(screen.getByTestId('Search')).toBeDefined();
    expect(screen.getByTestId('PokemonCard')).toBeDefined();
    expect(screen.getByTestId('SearchHistory')).toBeDefined();
    expect(onSearchChangeReference).toBeDefined();
    expect(pokemonReference).not.toBeDefined();
    expect(onSelectEvolutionReference).toBeDefined();
    expect(onSelectHistoryItemReference).toBeDefined();
    expect(pokemonNameReference).not.toBeDefined();
  });

  it('searches for pokemon when search has changed', async () => {
    render(<App />);

    await act( () => {
      onSearchChangeReference(mockPokemonItem.name)
    })

    await waitFor(() => {
      expect(pokemonAPI.getPokemonByName).toBeCalledWith(mockPokemonItem.name);
    })
    expect(pokemonAPI.getPokemonByName).toBeCalledTimes(1);
  });

  it('searches for pokemon when pokemon name is selected in evolution', async () => {

    render(<App />);

    await act( () => {
      onSelectEvolutionReference(mockPokemonItem.name)
    })

    await waitFor(() => {
      expect(pokemonAPI.getPokemonByName).toBeCalledWith(mockPokemonItem.name);
    });
    expect(pokemonAPI.getPokemonByName).toBeCalledTimes(1);

    expect(pokemonReference).toEqual(mockPokemonItem);
  });

  it('searches for pokemon when pokemon name is selected in history', async () => {

    render(<App />);

    await act( () => {
      onSelectHistoryItemReference(mockPokemonItem.name)
    })

    await waitFor(() => {
      expect(pokemonAPI.getPokemonByName).toBeCalledWith(mockPokemonItem.name);
    });
    expect(pokemonAPI.getPokemonByName).toBeCalledTimes(1);

    expect(pokemonReference).toEqual(mockPokemonItem);
  });
});
