import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SimpleList from '../../elements/List/SimpleList';
import useMood from '../../../hooks/useMood';

export default function MenuDesktop({ user }) {
  const app = useMood();
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (user) {
      if (app.getMood()) {
        setList([
          { id: 0, name: 'Desempeño' },
          { id: 1, name: 'Calendario' },
          { id: 2, name: 'Vehículos' },
          { id: 3, name: 'Perfil' },
        ]);
      } else {
        setList([
          { id: 0, name: 'Explorar' },
          { id: 1, name: 'Viajes' },
          { id: 2, name: 'Perfil' },
          { id: 3, name: 'Favoritos' },
        ]);
      }
    } else {
      setList([
        { id: 0, name: 'Iniciar sesión' },
        { id: 1, name: 'Registrarse' },
      ]);
    }
  }, []);

  const handleSelect = (value) => {
    if (user) {
      if (app.getMood()) {
        switch (value) {
          case 0:
            router.push('/host/performance');
            break;
          case 1:
            router.push('/host/calendar');
            break;
          case 2:
            router.push('/host/vehicles');
            break;
          case 3:
            router.push('/profile');
            break;
          default:
            break;
        }
      } else {
        switch (value) {
          case 0:
            router.push('/');
            break;
          case 1:
            router.push('/trips');
            break;
          case 2:
            router.push('/profile');
            break;
          case 3:
            router.push('/favorites');
            break;
          default:
            break;
        }
      }
    } else {
      switch (value) {
        case 0:
          router.push('/signin');
          break;
        case 1:
          router.push('/signup');
          break;
        default:
          break;
      }
    }
  };

  return <SimpleList list={list} onSelect={handleSelect} />;
}
