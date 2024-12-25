import { EntryTypes, HealthCheckRating, Gender } from './types';
import { z } from 'zod';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryTypes.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryTypes.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryTypes.Hospital),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const newEntrySchema = z.union([
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);
