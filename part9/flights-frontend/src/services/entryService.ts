import { DiaryEntry, NewDiaryEntry } from '../types';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

const getEntries = async (): Promise<DiaryEntry[]> => {
  const res = await axios.get(baseUrl);
  return res.data as DiaryEntry[];
};

const saveEntry = async (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  const res = await axios.post(baseUrl, newEntry);
  return res.data as DiaryEntry;
};

export default { getEntries, saveEntry };
