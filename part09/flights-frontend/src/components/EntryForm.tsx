import { useState } from 'react';
import { NewDiaryEntry } from '../types';

interface RadioInputProps {
  name: string;
  values: string[];
  setter: React.Dispatch<React.SetStateAction<string>>;
  getter: string;
}

const RadioInput = ({ name, values, setter, getter }: RadioInputProps) => {
  return (
    <div style={{ paddingTop: 5, paddingBottom: 5 }}>
      {name}
      {values.map((value) => (
        <label
          key={value}
          style={{
            backgroundColor: '#e3e3e3',
            padding: 3,
            margin: 3,
            outline: '1px solid #aaaaaa',
          }}
        >
          {value}
          <input
            id={value}
            name={name}
            type="radio"
            value={value}
            onChange={({ target }) => setter(target.value)}
            checked={getter === value}
          />
        </label>
      ))}
    </div>
  );
};

interface EntryFormProps {
  addEntry: (newEntry: NewDiaryEntry) => void;
}

const EntryForm = ({ addEntry }: EntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('great');
  const [weather, setWeather] = useState('sunny');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = { date, visibility, weather, comment };

    addEntry(newEntry);

    setDate('');
    setVisibility('great');
    setWeather('sunny');
    setComment('');
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date{' '}
          <input
            name="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          ></input>
        </div>
        <div>
          <RadioInput
            name="visibility"
            values={['great', 'good', 'ok', 'poor']}
            setter={setVisibility}
            getter={visibility}
          />
        </div>
        <div>
          <RadioInput
            name="weather"
            values={['sunny', 'rainy', 'cloudy', 'stormy', 'windy']}
            setter={setWeather}
            getter={weather}
          />
        </div>
        <div>
          comment{' '}
          <input
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
        </div>
        <button>add</button>
      </form>
    </>
  );
};

export default EntryForm;
