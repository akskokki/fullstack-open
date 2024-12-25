import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';

let patients = patientData;

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

const addEntry = (id: string, newEntry: NewEntry) => {
  const patient = getPatientById(id);
  if (!patient) throw new Error('invalid patient id');
  const entryId = uuid();
  const entry = { ...newEntry, id: entryId };
  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(entry),
  };
  patients = patients.map((p) => (p.id === id ? updatedPatient : p));
  return updatedPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
