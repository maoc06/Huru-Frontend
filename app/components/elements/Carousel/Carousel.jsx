import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import ScrollDown from '../ScrollDown/ScrollDown';
import styles from './Carousel.module.scss';

export default function AppCarousel({ images }) {
  const [imagesSrc, setImagesSrc] = useState([
    {
      carImageId: 'default-car-image',
      imagePath: '/images/default-car.png',
    },
  ]);

  useEffect(() => {
    if (images !== undefined && images.length > 0) {
      setImagesSrc(images);
    }
  }, [images]);

  return (
    <>
      <div className={styles.scrollIndicator}>
        <ScrollDown />
      </div>

      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop={true}
        className={styles.carousel}
      >
        {imagesSrc.map((item) => {
          const { imagePath } = item;
          return (
            <div key={imagePath} className={styles.slide}>
              {images.length === 0 && (
                <h4 className={styles.noSrcMessage}>
                  Este vehículo no tiene fotos
                </h4>
              )}

              <img src={imagePath} className={styles.image} />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
