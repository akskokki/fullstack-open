interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  hours: number[];
  target: number;
}

const parseArgumentsExercise = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const hours = args.slice(3).map((h) => Number(h));
  const target = Number(args.at(2));

  if (hours.some(isNaN) || isNaN(target)) {
    throw new Error('Provided values must be numbers');
  }
  if (hours.find((h) => h < 0) || target < 0) {
    throw new Error('Provided numbers must be positive');
  }

  return {
    hours,
    target,
  };
};

const calculateExercises = (): Result => {
  const { hours, target } = parseArgumentsExercise(process.argv);

  const average = hours.length
    ? hours.reduce((acc, h) => acc + h) / hours.length
    : 0;

  const ratio = average / target;

  let rating: number;
  if (ratio < 0.5) {
    rating = 1;
  } else if (ratio < 1) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'oh come on. were you even trying?';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'hurray! you met your training goal! 🎉';
      break;
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: ratio >= 1,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  console.log(calculateExercises());
} catch (e) {
  if (e instanceof Error) {
    console.log(`Error: ${e.message}`);
  } else {
    console.log('Unknown exception encountered');
  }
}
