import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders todo text', () => {
  const todo = {
    text: 'Gotta go fast',
    done: false,
  };

  render(<Todo todo={todo} />);

  expect(screen.getByText('Gotta go fast')).toBeDefined();
});
