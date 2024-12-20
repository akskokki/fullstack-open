import express, { json } from 'express';

import { calculateBmi, parseArgumentsBmi } from './bmiCalculator';

const app = express();

app.use(json());

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
  } catch (e) {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
