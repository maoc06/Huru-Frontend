import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import styles from './Carousel.module.scss';

export default function AppCarousel({ images }) {
  const [imagesSrc, setImagesSrc] = useState([
    { carImageId: '0001', imagePath: '' },
  ]);

  useEffect(() => {
    if (images !== undefined) {
      setImagesSrc(images);
    }
  }, [images]);

  return (
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
          <div key={imagePath}>
            <img src={imagePath} />
          </div>
        );
      })}
    </Carousel>
  );
}
