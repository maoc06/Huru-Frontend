import 'jest-canvas-mock';
import '@testing-library/jest-dom/extend-expect';
// import { useRouter } from 'next/router';

jest.setTimeout(15000);
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: () => null,
    };
  },
}));

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

// const CONSOLE_FAIL_TYPES = ['warn'];
// CONSOLE_FAIL_TYPES.forEach((type) => {
//   console[type] = (_) => {
//     break;
//   }
// });
