import { useEffect, useState } from 'react';

import { DiaryEntry, NewDiaryEntry } from './types';
import entryService from './services/entryService';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import axios from 'axios';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    entryService
      .getEntries()
      .then((initialEntries) => setEntries(initialEntries));
  }, []);

  const addEntry = async (newEntry: NewDiaryEntry) => {
    try {
      const addedEntry = await entryService.saveEntry(newEntry);
      setEntries(entries.concat(addedEntry));
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        notify(e.response.data);
      } else {
        notify('unknown error has occurred');
      }
    }
  };

  const notify = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  return (
    <>
      <div style={{ color: 'red' }}>{notification}</div>
      <EntryForm addEntry={addEntry} />
      <EntryList entries={entries} />
    </>
  );
};

export default App;
