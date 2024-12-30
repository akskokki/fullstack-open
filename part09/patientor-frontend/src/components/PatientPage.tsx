import { Male, Female, QuestionMark } from '@mui/icons-material';

import EntryDetails from './EntryDetails';
import NewEntryForm from './NewEntryForm';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { Diagnosis, NewEntry, PatientDetails } from '../types';
import axios from 'axios';

const PatientPage = ({
  patientId,
  diagnoses,
}: {
  patientId: string | null | undefined;
  diagnoses: Diagnosis[];
}) => {
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!patientId) return;
    patientService.getById(patientId).then((result) => setPatient(result));
  }, [patientId]);

  if (!patient) return null;

  const notify = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 10000);
  };

  const addEntry = (patientId: string, newEntry: NewEntry) => {
    patientService
      .createEntry(patientId, newEntry)
      .then((result) => setPatient(result))
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          const errorData = e.response?.data.error[0];
          let notifMessage = errorData?.message;
          if (errorData.code === 'invalid_union') {
            const unionIssue = errorData.unionErrors[0]?.issues[0];
            notifMessage = `Invalid ${unionIssue?.path[0]}: ${unionIssue?.message}`;
          }
          notify(notifMessage);
        } else {
          notify('unknown error occurred');
        }
      });
  };

  const genderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <QuestionMark />;
      default:
        return null;
    }
  };

  return (
    <>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
      <div>occupation: {patient.occupation}</div>
      <br />
      <h3 style={{ color: 'red' }}>{notification}</h3>
      <NewEntryForm patientId={patient.id} addEntry={addEntry} />
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <EntryDetails entry={e} key={e.id} diagnoses={diagnoses} />
      ))}
    </>
  );
};

export default PatientPage;
