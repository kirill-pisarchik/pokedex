import React, {FC, KeyboardEvent, MouseEvent, useState} from 'react';
import classes from './AutoSuggestSearch.module.css';
import AutoSuggest, {
  ChangeEvent,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams
} from 'react-autosuggest';
import {NamedAPIResource} from 'pokenode-ts';
import {AutoSuggestSearchProps} from '../../pokedex';

const AutoSuggestSearch: FC<AutoSuggestSearchProps> = ({ label, allSuggestions, onChangeValue }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<NamedAPIResource[] | []>([]);

  const isValueValid = (value:string) => {
    if (allSuggestions.find(i => i.name === value)) {
      return true;
    }
  }
  const onChangeSearch = (event: React.FormEvent<HTMLElement>, value: ChangeEvent) => {
    setValue(value.newValue);
  }

  const onSuggestionSelected = (event: React.FormEvent<any>, data: SuggestionSelectedEventData<any>) => {
    if (isValueValid(data.suggestion.name)){
      onChangeValue(data.suggestion);
    }
  }

  const onSuggestionsFetchRequested = ({ value }:SuggestionsFetchRequestedParams) => {
    const cleanValue = value
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

    const starts = [];
    const match = [];
    let i = 0;
    while ((starts.length < 10 || match.length < 10) && i < allSuggestions.length) {
      if (allSuggestions[i].name.startsWith(cleanValue)) {
        starts.push(allSuggestions[i]);
      }
      if (allSuggestions[i].name.match(cleanValue)) {
        match.push(allSuggestions[i]);
      }
      i++;
    }

    setSuggestions([...starts, ...match]);
  }
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }
  const renderSuggestion = (suggestion:NamedAPIResource) => (
    <div style={{cursor: 'pointer', padding: '0.2rem'}}>
      {suggestion.name}
    </div>
  )

  const getSuggestionValue = (suggestion:NamedAPIResource) => suggestion.name

  const handleKeyDown = (e:KeyboardEvent) => {
    if (e.code.toLowerCase() === 'enter') {
      if (isValueValid(value)){
        onChangeValue({name: value});
      }
    }
  }

  const handleButtonClick = (e:MouseEvent) => {
    if (isValueValid(value)){
      onChangeValue({name: value});
    }
    return false;
  }

  return (
    <div title='search' className={classes.input} onKeyDown={handleKeyDown}>
      <label>{label}</label>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={{
          value,
          onChange: onChangeSearch
        }}
      />
      <button className={classes.button} onClick={handleButtonClick}>Search</button>
    </div>
  );
};

export default AutoSuggestSearch;
