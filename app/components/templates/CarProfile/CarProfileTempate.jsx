import CarSpecifications from '../../modules/CarSpecifications/CarSpecifications';

import styles from './CarProfileTemplate.module.scss';

const CarProfileTemplate = ({
  title,
  description,
  typeTransmission,
  numSeats,
  typeGas,
}) => {
  return (
    <main className={styles.wrapper}>
      <section>
        <h5>{title}</h5>
        <p>{description}</p>
      </section>

      <section>
        <span>Especificaciones</span>
        <CarSpecifications
          typeTransmission={typeTransmission}
          numSeats={numSeats}
          typeGas={typeGas}
        />
      </section>

      <section>
        <span>Caracteristicas</span>
      </section>

      <section>
        <span>Disponibilidad</span>
      </section>

      <span>
        <span>Reseñas</span>
      </span>

      <span>
        <span>Dueño</span>
      </span>

      <span>
        <span>Políticas de cancelación</span>
      </span>
    </main>
  );
};

export default CarProfileTemplate;
