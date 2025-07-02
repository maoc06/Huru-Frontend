import { Provider } from 'react-redux';
import Head from 'next/head';

import '../app/styles/base/_base.scss';
import store from '../app/redux/store/store';

import '../app/styles/app.scss';

// Global responsive fix styles
const globalStyles = `
  /* Prevent horizontal overflow on all pages */
  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  
  /* Fix viewport issues on mobile */
  * {
    box-sizing: border-box;
  }
  
  /* Ensure proper touch target sizes on mobile */
  button, input, select, textarea, a {
    min-height: 44px;
  }
  
  /* Prevent text from being too small on mobile */
  body {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  
  /* Fix Material-UI components overflow */
  .MuiContainer-root {
    overflow-x: hidden !important;
  }
  
  /* Ensure all form elements are ALWAYS left-aligned on ALL screen sizes */
  input, 
  textarea, 
  select,
  label,
  .form-field,
  [class*="textfield"],
  [class*="input"],
  [class*="field"] {
    text-align: left !important;
  }
  
  /* Ensure error messages are ALWAYS left-aligned */
  .error-message,
  [class*="error"],
  [class*="statusMsg"] {
    text-align: left !important;
  }
  
  /* Ensure placeholders are ALWAYS left-aligned */
  input::placeholder,
  textarea::placeholder {
    text-align: left !important;
  }
  
  /* Fix form fields on mobile */
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"],
  textarea {
    font-size: 16px !important; /* Prevent zoom on iOS */
  }
  
  @media (min-width: 768px) {
    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="tel"],
    textarea {
      font-size: 1rem !important;
    }
  }
  

`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Critical responsive meta tags */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes, viewport-fit=cover" 
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Inject global responsive styles */}
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </Head>
      
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
