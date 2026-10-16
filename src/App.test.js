import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';

const mockGraphql = jest.fn();

jest.mock('aws-amplify/api', () => ({
  generateClient: () => ({ graphql: mockGraphql }),
}));

// CRA's jest config resets mocks before each test, so set the implementation here.
beforeEach(() => {
  mockGraphql.mockResolvedValue({
    data: {
      createGame: { id: 'test-game' },
      listHighScores: { items: [{ id: '1', name: 'Piggy', score: 42 }] },
    },
  });
});

test('renders the title and an empty board', async () => {
  const { getByText } = render(<App />);
  expect(getByText('Plop Circles')).toBeInTheDocument();
  expect(getByText('Score: 0')).toBeInTheDocument();
  await wait(() => expect(mockGraphql).toHaveBeenCalledTimes(2));
});

test('starts a game and fetches high scores on load', async () => {
  render(<App />);
  await wait(() => expect(mockGraphql).toHaveBeenCalledTimes(2));
  const queries = mockGraphql.mock.calls.map(([req]) => req.query);
  expect(queries.some((q) => /createGame/.test(q))).toBe(true);
  expect(queries.some((q) => /listHighScores/.test(q))).toBe(true);
});

test('shade button toggles between hollow and solid', async () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Hollow'));
  expect(getByText('Solid')).toBeInTheDocument();
  await wait(() => expect(mockGraphql).toHaveBeenCalledTimes(2));
});

test('rules button opens the rules modal', async () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Rules'));
  expect(getByText(/Plop as many circles as you can/)).toBeInTheDocument();
  await wait(() => expect(mockGraphql).toHaveBeenCalledTimes(2));
});
