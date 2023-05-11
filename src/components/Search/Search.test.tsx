import React, {FC} from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils'
import Search from './Search';
import {NamedAPIResource} from 'pokenode-ts';
import {AutoSuggestSearchProps, CardProps} from '../../pokedex';
import pokemonAPI from '../../services/pokemonAPI';

let allSuggestionsRef: NamedAPIResource[];
let onChangeValueRef: Function;
let labelRef: string;
let classNameRef: string | undefined;
let mockOnSearchChange = jest.fn();

jest.mock('../UI/Card', () => {
  const ComponentToMock: FC<CardProps> = ({ children,className }) => {
    classNameRef = className;
    return <div data-testid='Card'>{children}</div>;
  }
  return ComponentToMock;
});

jest.mock('../UI/AutoSuggestSearch', () => {
  const ComponentToMock: FC<AutoSuggestSearchProps> = ({ allSuggestions, onChangeValue, label }) => {
    allSuggestionsRef = allSuggestions;
    onChangeValueRef = onChangeValue;
    labelRef = label;
    return <div data-testid='AutoSuggestSearch'/>;
  }
  return ComponentToMock;
});

describe('Search component', () => {
  const mockPokemonItems:NamedAPIResource[] = [
    {name: 'pikachu', url: '/pikachu'},
    {name: 'venusaur', url: '/venusaur'},
    {name: 'bulbasaur', url: '/bulbasaur'}
  ]
  beforeEach(() => {
    pokemonAPI.getAllPokemonNames = jest.fn().mockResolvedValue(mockPokemonItems);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the search input', async () => {
    await act(() => {
      render(<Search onSearchChange={mockOnSearchChange}/>);
    });
    expect(pokemonAPI.getAllPokemonNames).toBeCalledTimes(1);
    expect(screen.getByTestId('Card')).toBeInTheDocument();
    expect(screen.getByTestId('AutoSuggestSearch')).toBeInTheDocument();

    expect(labelRef).toBeDefined();
    expect(onChangeValueRef).toBeDefined();
    expect(classNameRef).toBeDefined();
  });

  it('should call the onSearchChange callback with the selected Pokemon', async () => {
    await act(() => {
      render(<Search onSearchChange={mockOnSearchChange}/>);
    });
    const mockPokemon = {name: 'test'}

    onChangeValueRef(mockPokemon);

    await waitFor(() => expect(mockOnSearchChange).toHaveBeenCalledWith(mockPokemon.name));
  });
});
