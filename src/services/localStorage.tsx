import {SearchHistoryItem} from '../pokedex';

const updateHistory = (history:SearchHistoryItem[]) => {
  localStorage.setItem('searchHistory', JSON.stringify(history));
}

const getHistory = ():SearchHistoryItem[] | [] => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : [];
}

const storage = {
  updateHistory,
  getHistory
};

export default storage;
