import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import authStorage from '../utils/storageAuth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const accessToken = authStorage.getToken();
      if (!accessToken) {
        setIsAuthenticated(false);
        router.push('/signin');
      }
      setIsLoading(false);
    }, []);

    // During server-side rendering or loading, return a placeholder div
    // This ensures hydration matching
    if (typeof window === 'undefined' || isLoading) {
      return <div className="auth-wrapper" />;
    }

    // If not authenticated, return placeholder (will redirect in useEffect)
    if (!isAuthenticated) {
      return <div className="auth-wrapper" />;
    }

    // If authenticated and not loading, render the component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
