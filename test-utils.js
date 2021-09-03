import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './app/redux/store/store';

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
