import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (newPatient: NewPatient) => {
  const id = uuid();
  const patient = { ...newPatient, id };
  patients.push(patient);
  return patient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
