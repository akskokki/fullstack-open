import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string) => {
  return patients.find((p) => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);
};

const addPatient = (newPatient: NewPatient) => {
  const id = uuid();
  const patient = { ...newPatient, entries: [], id };
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addPatient,
};
