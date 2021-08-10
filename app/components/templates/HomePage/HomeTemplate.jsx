import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Avatar from '../../elements/Avatar/Avatar';
import Button from '../../elements/Button/Button';
import { LogoColor } from '../../elements/Icons/Shared';
import SearchForm from '../../modules/SearchForm/SearchForm';
import MenuDesktop from '../../modules/MenuDesktop/MenuDesktop';
import storageAuth from '../../../utils/storageAuth';
import styles from './HomeTemplate.module.scss';

const HomeTemplate = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [showMenuDesktop, setShowMenuDesktop] = useState(false);

  const handleCallToAction = () => {
    if (user) router.push('/add-vehicle');
    else router.push('/login');
  };

  const handleAvatar = () => {
    setShowMenuDesktop(!showMenuDesktop);
  };

  useEffect(() => {
    const resUser = storageAuth.getUser();
    if (resUser) setUser(resUser.info);
  }, []);

  return (
    <section className={styles.top}>
      <section className={styles.header}>
        <div
          onClick={() => {
            router.push('/');
          }}
          className={styles.logo}
        >
          <LogoColor />
        </div>

        <div className={styles.avatar} onClick={handleAvatar}>
          {user ? (
            <Avatar src={user.profilePicture} size="large" />
          ) : (
            <Avatar />
          )}
          {showMenuDesktop && (
            <div className={styles.menuDesktop}>
              <MenuDesktop user={user} />
            </div>
          )}
        </div>
      </section>

      <h3>¿A dónde irás después?</h3>

      <SearchForm startDateBorder={true} />

      <h5 className={styles.subtitle}>
        Encuentra el vehículo perfecto <span>para cada momento</span>
      </h5>

      <section className={styles.moments}>
        <div className={styles.card}>
          <Image
            src={'/images/day-dream.png'}
            alt={'viaje soñado en carro'}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className={styles.card}>
          <Image
            src={'/images/style.png'}
            alt={'viaje con estilo en carro'}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className={styles.card}>
          <Image
            src={'/images/daytoday.png'}
            alt={'carro para el día a día'}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className={styles.card}>
          <Image
            src={'/images/aventure.png'}
            alt={'aventura en carro'}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      <div className={styles.promotion}>
        <article className={styles.info}>
          <h6>
            Anímate a ser un <span>Huru Amigo</span>
          </h6>
          <p>
            Gana dinero extra y descubre nuevas posibilidades al compartir tu
            vehículo.
          </p>
          <Button isWhite={true} onClick={handleCallToAction}>
            Empezar
          </Button>
        </article>

        <article className={styles.image}>
          <Image
            src={'/images/keys-promotion.png'}
            alt={'ser huru amigo'}
            layout="fill"
            objectFit="cover"
          />
        </article>
      </div>
    </section>
  );
};

export default HomeTemplate;
