import { useRouter } from 'next/router';

import authStorage from '../utils/storageAuth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();

      const accessToken = authStorage.getToken();

      if (!accessToken) {
        router.push('/signin');
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
