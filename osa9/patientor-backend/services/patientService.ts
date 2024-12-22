import patients from '../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

export default { getPatients, getNonSensitivePatients };
