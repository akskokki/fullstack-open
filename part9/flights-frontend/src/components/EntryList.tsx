import { DiaryEntry } from '../types';

interface EntryListProps {
  entries: DiaryEntry[];
}

const EntryList = ({ entries }: EntryListProps) => {
  return (
    <>
      <h2>Diary entries</h2>
      {entries.map((e) => (
        <div key={e.id}>
          <h3>{e.date}</h3>
          <p>
            <i>{e.comment}</i>
          </p>
          <div>visibility: {e.visibility}</div>
          <div>weather: {e.weather}</div>
        </div>
      ))}
    </>
  );
};

export default EntryList;
