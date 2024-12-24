export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: [];
}

export interface PatientDetails extends Patient {
  ssn: string;
  entries: [];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
