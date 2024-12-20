interface BMIValues {
  height: number;
  weight: number;
}

const parseArgumentsBMI = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values must be numbers');
  }
  if (height <= 0 || weight <= 0) {
    throw new Error('Provided numbers must be non-zero and positive');
  }

  return {
    height,
    weight,
  };
};

const calculateBmi = (): string => {
  const { height, weight } = parseArgumentsBMI(process.argv);

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight (Pre-obese)';
  if (bmi < 35) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

try {
  console.log(calculateBmi());
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(`Error: ${e.message}`);
  } else {
    console.log('Unknown exception encountered');
  }
}
