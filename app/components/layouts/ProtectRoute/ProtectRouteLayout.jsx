// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// import { noProtectRoutes } from '../../../constants/noProtectRoutes';
import authStorage from '../../../utils/storageAuth';
import LoginTemplate from '../../templates/LoginPage/LoginTemplate';

export default function ProtectRoute({ children }) {
  // const router = useRouter();
  // const [isAuthenticated, setAuthenticated] = useState(false);

  // const restoreUser = () => {
  //   const user = authStorage.getUser();
  //   if (user) setAuthenticated(true);
  //   console.log('ProtectRoute', user);
  // };

  // useEffect(() => {
  //   restoreUser();
  // }, []);

  if (!authStorage.getUser()) {
    return <LoginTemplate />;
  }
  return children;
}
