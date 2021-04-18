import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Online formatter header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Online formatter/i);
  expect(linkElement).toBeInTheDocument();
});
