import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

test('should render button and respond to click event', () => {
  const handleClick = jest.fn();
  render(<Modal closeModal={handleClick} />);
  const btnEl = screen.getByRole('button', { hidden: true });
  expect(btnEl).toBeTruthy();
  fireEvent.click(btnEl);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
