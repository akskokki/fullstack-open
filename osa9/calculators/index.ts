import express from 'express';

import { calculateBmi, parseArgumentsBmi } from './bmiCalculator';

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

  const hoursArg = body.hours as Array<unknown>;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hours = body.hoursArg.map(Number);
    res.json({ wat: 'wat' });
  } catch {
    console.log('meh');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
