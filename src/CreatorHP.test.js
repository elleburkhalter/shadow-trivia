import { render, screen } from '@testing-library/react';
import CreatorHP from './CreatorHP';

test('renders learn react link', () => {
  render(<CreatorHP />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
