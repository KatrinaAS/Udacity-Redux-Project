import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders main view', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/an account/i)).toBeInTheDocument();
});

test('Default view remains same', () => {
    const view=render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    expect(view).toMatchSnapshot();
})
