import express from 'express';

import { calculateBmi, parseArgumentsBmi } from './bmiCalculator';
import {
  calculateExercises,
  parseArgumentsExercise,
} from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseArgumentsBmi(
      req.query.height,
      req.query.weight
    );
    res.json({ weight, height, bmi: calculateBmi(height, weight) });
  } catch {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hoursArg = body.daily_exercises as Array<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const targetArg = body.target;

  if (hoursArg === undefined || targetArg === undefined) {
    res.status(400).json({ error: 'parameters missing' });
  }
  try {
    const { hours, target } = parseArgumentsExercise(hoursArg, targetArg);
    res.json(calculateExercises(hours, target));
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
