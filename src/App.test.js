import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { App } from './App';

describe('App', () => {
  const mockStore = configureStore([thunk]);

  const initialState = {
    AppData: {
      isRequesting: false,
      isInitLoaded: false,
      error: null,
    },
  };

  const renderApp = (state = initialState) => {
    const store = mockStore(state);

    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  it('renders component', () => {
    const { baseElement } = renderApp();
    expect(baseElement).toBeInTheDocument();
  });
  it('renders error state', async () => {
    const AppData = { ...initialState.AppData, error: 'broke' };
    const { findByText } = renderApp({ AppData });
    const error = await findByText('Error loading application');

    expect(error).toBeTruthy();
  });
  it('renders init loading', async () => {
    const AppData = { ...initialState.AppData, isRequesting: true };
    const { findByRole } = renderApp({ AppData });
    const progress = await findByRole(/progressbar/);

    expect(progress).toBeTruthy();
  });
  it('renders start app button', async () => {
    const { findByRole } = renderApp();
    const button = await findByRole(/button/);

    expect(button).toBeTruthy();
  });
});
