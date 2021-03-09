import { Provider } from 'react-redux';

import '../app/styles/base/_base.scss';
import store from '../app/redux/store/store';

// import ProtectRoute from '../app/components/layouts/ProtectRoute/ProtectRouteLayout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
