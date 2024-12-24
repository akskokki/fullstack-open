import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { HospitalEntry, EntryTypes } from '../types';
import {
  HealthAndSafety,
  LocalHospital,
  MedicalServices,
} from '@mui/icons-material';
import HealthRatingBar from './HealthRatingBar';
import { useEffect, useState } from 'react';
import diagnosisService from '../services/diagnosis';

const entryStyle: React.CSSProperties = {
  outline: '1px solid',
  padding: 5,
  marginBottom: 5,
};

const DiagnosisCodeList = ({ codes }: { codes: string[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisService.getAll().then((ds) => setDiagnoses(ds));
  }, []);

  return (
    <>
      <h4>diagnosis codes</h4>
      <ul>
        {codes.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
    </>
  );
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={entryStyle}>
      <div>
        <LocalHospital />
      </div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <div>
        discharge on: {entry.discharge.date} ({entry.discharge.criteria})
      </div>
      <div>diagnosis by {entry.specialist}</div>
      {entry.diagnosisCodes && (
        <DiagnosisCodeList codes={entry.diagnosisCodes} />
      )}
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div style={entryStyle}>
      <div>
        <MedicalServices /> {entry.employerName}
      </div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} &ndash;{' '}
          {entry.sickLeave.endDate}
        </div>
      )}
      <div>diagnosis by {entry.specialist}</div>
      {entry.diagnosisCodes && (
        <DiagnosisCodeList codes={entry.diagnosisCodes} />
      )}
    </div>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={entryStyle}>
      <div>
        <HealthAndSafety />
      </div>
      <div>{entry.date}</div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        <HealthRatingBar rating={entry.healthCheckRating} />
      </div>
      <div>diagnosis by {entry.specialist}</div>
      {entry.diagnosisCodes && (
        <DiagnosisCodeList codes={entry.diagnosisCodes} />
      )}
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const assertNever = (_: never) => {
    throw new Error('invalid entry type');
  };

  switch (entry.type) {
    case EntryTypes.Hospital:
      return <HospitalEntryDetails entry={entry} />;
    case EntryTypes.OccupationalHealthcare:
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case EntryTypes.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
