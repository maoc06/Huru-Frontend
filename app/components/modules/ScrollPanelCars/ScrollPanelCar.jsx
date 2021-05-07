import { useRouter } from 'next/router';
import ScrollContainer from 'react-indiana-drag-scroll';

import CardHorizontal from '../../modules/CardHorizontal/CardHorizontal';

import styles from './ScrollPanelCar.module.scss';

const ScrollPanelCars = ({ cars = [] }) => {
  const router = useRouter();

  return (
    <ScrollContainer vertical={false} activationDistance={5}>
      <div className={styles.cars_container}>
        {cars.map(({ carId, maker, model, images, year }) => {
          return (
            <CardHorizontal
              key={carId}
              title={`${maker.name} ${model.name} ${year}`}
              imageSrc={images[0].imagePath}
              onSelect={() => router.push(`/car/${encodeURIComponent(carId)}`)}
              showPanelDates={false}
              showPanelPrice={false}
            />
          );
        })}
        ;
      </div>
    </ScrollContainer>
  );
};

export default ScrollPanelCars;
