import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { newEntrySchema, newPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientById(id));
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const returnPatient = patientService.addPatient(req.body);
    res.json(returnPatient);
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>) => {
    const updatedPatient = patientService.addEntry(req.params.id, req.body);
    res.json(updatedPatient);
  }
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
