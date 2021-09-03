import ScrollContainer from 'react-indiana-drag-scroll';

import CardHorizontal from '../../modules/CardHorizontal/CardHorizontal';

import styles from './ScrollPanelCar.module.scss';

const ScrollPanelCars = ({ cars = [] }) => {
  return (
    <ScrollContainer vertical={false} activationDistance={5}>
      <div className={styles.cars_container}>
        {cars.map(({ carId, maker, model, images, year }) => {
          const imageSrc =
            images.length === 0
              ? '/images/default-car.png'
              : images[0].imagePath;
          return (
            <CardHorizontal
              key={carId}
              title={`${maker.name} ${model.name} ${year}`}
              imageSrc={imageSrc}
              href={`/car/${encodeURIComponent(carId)}`}
              showPanelDates={false}
              showPanelPrice={false}
              forceRowDirection={false}
            />
          );
        })}
      </div>
    </ScrollContainer>
  );
};

export default ScrollPanelCars;
