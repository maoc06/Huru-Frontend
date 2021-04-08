import Link from 'next/link';
import ScrollContainer from 'react-indiana-drag-scroll';

import CarSpecifications from '../../modules/CarSpecifications/CarSpecifications';
import UserProfileBasicInfo from '../../modules/UserProfileBasicInfo/UserProfileBasicInfo';
import SearchForm from '../../modules/SearchForm/SearchForm';
import CardReview from '../../elements/CardReview/CardReview';
import FeatureSimple from '../../elements/FeatureSimple/FeatureSimple';
import Divider from '../../elements/Divider/Divider';

import styles from './CarProfileTemplate.module.scss';

const CarProfileTemplate = ({
  username = '',
  userJoinAt = '',
  title,
  titleDates = 'Disponibilidad',
  titleUser = 'Huru Amigo',
  description,
  typeTransmission,
  numSeats,
  typeGas,
  features = [],
  showDescription = true,
  showSpecifications = true,
  showFeatures = true,
  showUser = true,
  showPolicies = true,
}) => {
  return (
    <main className={styles.wrapper}>
      <article className={styles.inner}>
        <h5>{title}</h5>

        {showDescription && <p className={styles.long_text}>{description}</p>}
      </article>

      <Divider />

      {showSpecifications && (
        <>
          <article className={styles.inner}>
            <span className={styles.title}>Especificaciones</span>

            <CarSpecifications
              typeTransmission={typeTransmission}
              numSeats={numSeats}
              typeGas={typeGas}
            />
          </article>

          <Divider />
        </>
      )}

      {showFeatures && (
        <>
          <article className={styles.inner}>
            <span className={styles.title}>Caracteristicas</span>

            {features.length === 0 && <p>Este carro no ticas asignadas.</p>}

            {features.length > 0 &&
              features.slice(0, 3).map((feature) => {
                return <FeatureSimple key={feature} featureId={feature} />;
              })}

            <div className={styles.see_details}>
              <Link href={`/car/details/features`}>
                <a>Ver todas</a>
              </Link>
            </div>
          </article>

          <Divider />
        </>
      )}

      <article className={styles.inner}>
        <span className={styles.title}>{titleDates}</span>

        <SearchForm isCompact={true} showInputPlaces={false} />
      </article>

      <Divider />

      {showUser && (
        <>
          <article className={styles.inner}>
            <span className={styles.title}>{titleUser}</span>

            <UserProfileBasicInfo name={username} createdAt={userJoinAt} />
            <div></div>
          </article>

          <Divider />
        </>
      )}

      <article className={styles.inner_left}>
        <span className={styles.title}>Reseñas</span>

        <ScrollContainer vertical={false} activationDistance={5}>
          <div className={styles.reviews_container}>
            <CardReview />
            <CardReview />
            <CardReview />
          </div>
        </ScrollContainer>

        <div className={`${styles.see_details} ${styles.extra_space}`}>
          <Link href="">
            <a>Ver todas</a>
          </Link>
        </div>
      </article>

      <Divider />

      {showPolicies && (
        <article className={styles.inner}>
          <span className={styles.title}>Políticas de cancelación</span>

          <p className={styles.long_text}>
            Si cancelas antes de las 9:00 AM del 1 Abril, recibiras un reembolso
            comp...
          </p>

          <div className={styles.see_details}>
            <Link href="">
              <a>Conocer más detalles</a>
            </Link>
          </div>
        </article>
      )}
    </main>
  );
};

export default CarProfileTemplate;
