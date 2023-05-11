import React from 'react';
import {render, screen} from '@testing-library/react';

import SearchHistory from './SearchHistory';
import storage from '../../services/localStorage';

describe('SearchHistory', () => {
  const mockPokemonItem = {name: 'pikachu'};

  beforeEach(() => {
    storage.updateHistory = jest.fn();
    storage.getHistory = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders App component', () => {
    let pokemonNameReference:string | undefined;
    let onSelectHistoryItemReference = jest.fn();
    storage.getHistory = jest.fn().mockReturnValueOnce([]);

    render(<SearchHistory
      pokemonName={pokemonNameReference}
      onSelectHistoryItem={onSelectHistoryItemReference}
    />);

    expect(storage.getHistory).toBeCalledTimes(1);
    expect(screen.getByRole('heading')).toBeDefined();
  });

  it('adds a pokemon name to the history', () => {
    let pokemonNameReference:string | undefined = mockPokemonItem.name;
    let onSelectHistoryItemReference = jest.fn();
    storage.getHistory = jest.fn().mockReturnValueOnce([]);
    const mockUpdateHistory = jest.fn();
    storage.updateHistory = mockUpdateHistory;

    render(<SearchHistory
      pokemonName={pokemonNameReference}
      onSelectHistoryItem={onSelectHistoryItemReference}
    />);

    expect(storage.getHistory).toBeCalledTimes(1);
    expect(mockUpdateHistory).toBeCalledTimes(1);
    expect(mockUpdateHistory.mock.calls[0][0][0].name).toEqual(pokemonNameReference);

    expect(screen.getByRole('heading')).toBeDefined();
  });

});
