import { Button } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { EntryTypes, NewEntry } from '../types';

const NewEntryForm = ({
  patientId,
  addEntry,
}: {
  patientId: string | null | undefined;
  addEntry: (patientId: string, newEntry: NewEntry) => void;
}) => {
  const [entryType, setEntryType] = useState<EntryTypes>(
    EntryTypes.HealthCheck
  );
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickStartDate, setSickStartDate] = useState('');
  const [sickEndDate, setSickEndDate] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  if (!patientId) return null;

  const resetFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');

    setHealthCheckRating('');

    setEmployerName('');
    setSickStartDate('');
    setSickEndDate('');

    setDischargeDate('');
    setDischargeCriteria('');
  };

  const createEntryObject = (): NewEntry => {
    const assertNever = (_: never) => {
      throw new Error('invalid enum value');
    };

    switch (entryType) {
      case EntryTypes.HealthCheck:
        return {
          type: EntryTypes.HealthCheck,
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(',').map((s) => s.trim()),
          healthCheckRating: Number(healthCheckRating),
        };
      case EntryTypes.OccupationalHealthcare:
        return {
          type: EntryTypes.OccupationalHealthcare,
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(',').map((s) => s.trim()),
          employerName,
          sickLeave: {
            startDate: sickStartDate,
            endDate: sickEndDate,
          },
        };
      case EntryTypes.Hospital:
        return {
          type: EntryTypes.Hospital,
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(',').map((s) => s.trim()),
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      default:
        return assertNever(entryType);
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry = createEntryObject();
    addEntry(patientId, newEntry);

    resetFields();
  };

  const inputField = (
    name: string,
    getter: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <div>
      <div>{name}</div>
      <div>
        <input
          name={name}
          value={getter}
          onChange={({ target }) => setter(target.value)}
        />
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <div>entry type</div>
        <select
          onChange={({ target }) => setEntryType(target.value as EntryTypes)}
        >
          <option value={EntryTypes.HealthCheck}>Health Check</option>
          <option value={EntryTypes.OccupationalHealthcare}>
            Occupational Healthcare
          </option>
          <option value={EntryTypes.Hospital}>Hospital</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        {inputField('description', description, setDescription)}
        {inputField('date', date, setDate)}
        {entryType === EntryTypes.HealthCheck &&
          inputField(
            'health check rating',
            healthCheckRating,
            setHealthCheckRating
          )}
        {entryType === EntryTypes.OccupationalHealthcare && (
          <>
            {inputField('employer name', employerName, setEmployerName)}
            {inputField(
              'sick leave start date',
              sickStartDate,
              setSickStartDate
            )}
            {inputField('sick leave end date', sickEndDate, setSickEndDate)}
          </>
        )}
        {entryType === EntryTypes.Hospital && (
          <>
            {inputField('discharge date', dischargeDate, setDischargeDate)}
            {inputField(
              'discharge criteria',
              dischargeCriteria,
              setDischargeCriteria
            )}
          </>
        )}
        {inputField('specialist', specialist, setSpecialist)}
        {inputField('diagnosis codes', diagnosisCodes, setDiagnosisCodes)}
        <Button variant="contained" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default NewEntryForm;
