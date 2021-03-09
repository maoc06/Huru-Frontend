import Image from 'next/image';

import styles from './FullTopImageLayout.module.scss';

export default function FullTopImageLayout({ image, alt, children }) {
  return (
    <>
      <section className={styles.top_image}>
        <Image
          src={image}
          alt={alt}
          width={1009}
          height={696}
          layout={'responsive'}
        />
      </section>

      <section>{children}</section>
    </>
  );
}
