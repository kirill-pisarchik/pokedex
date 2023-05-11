import {PropsWithChildren} from 'react';
import {NamedAPIResource, Pokemon} from 'pokenode-ts';

interface SearchProps extends PropsWithChildren {
  onSearchChange: Function;
}

interface SearchHistoryProps extends PropsWithChildren {
  pokemonName: string | undefined,
  onSelectHistoryItem: Function
}

interface SearchHistoryItem {
  name: string
  date: number
}

interface PokemonCardProps extends PropsWithChildren {
  pokemon: Pokemon | undefined,
  onSelectEvolution: Function
}

interface AutoSuggestSearchProps extends PropsWithChildren {
  label: string
  allSuggestions: NamedAPIResource[],
  onChangeValue: Function,
}

interface CardProps extends PropsWithChildren {
  className?: string
}

interface PokemonEvolutionProps extends PropsWithChildren {
  pokemonName: string,
  evolutionChain: ChainLinkGrid,
  onClickEvolutionStage: Function
}


type ChainLinkRow = (null|string)[];
type ChainLinkGrid = ChainLinkRow[];
