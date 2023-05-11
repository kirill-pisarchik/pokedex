import {FC, useEffect, useMemo, useState} from 'react';
import {SearchHistoryItem, SearchHistoryProps} from '../../pokedex';
import classes from './SearchHistory.module.css';
import Card from '../UI/Card';
import storage from '../../services/localStorage';

const SearchHistory:FC<SearchHistoryProps> = ({pokemonName, onSelectHistoryItem}) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([])

  const lastHistoryName = history.length ? history[history.length - 1].name : undefined;

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    if ((lastHistoryName || '') !== pokemonName) {
      setHistory((prevState) => {
        let history = [...prevState];
        history.push({
          name: pokemonName,
          date: Date.now()
        });
        if (history.length > 20) {
          history.shift();
        }

        storage.updateHistory(history);
        return history;
      })
    }
  }, [pokemonName]);

  useEffect(() => {
    const history = storage.getHistory();
    if (history.length) {
      setHistory(() => history);
      onSelectHistoryItem(history[history.length - 1].name);
    }
  }, []);

  const noHistoryMessage = <p>No Pokemon found yet</p>

  const historyContent = useMemo(() => [...history].reverse()
    .map(h => (
      <li className={classes.history_item} key={h.date} onClick={() => onSelectHistoryItem(h.name)}>
        {h.name}
      </li>
    )
  ), [lastHistoryName]);

  return (<Card>
    <h4>Your Search</h4>
    <ul>
      {lastHistoryName ? historyContent : noHistoryMessage}
    </ul>
  </Card>);
};

export default SearchHistory;
