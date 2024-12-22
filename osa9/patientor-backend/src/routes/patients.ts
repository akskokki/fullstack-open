import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const returnPatient = patientService.addPatient(newPatient);
  res.send(returnPatient);
});

export default router;
