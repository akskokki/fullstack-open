import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Male, Female, QuestionMark } from '@mui/icons-material';

import { PatientDetails } from '../types';
import patientService from '../services/patients';

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    patientService.getById(id).then((p) => setPatient(p));
  }, [id]);

  if (!patient) return null;

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
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <strong>{e.date}</strong>: {e.description}
          {e.diagnosisCodes && (
            <ul>
              {e.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default PatientPage;
