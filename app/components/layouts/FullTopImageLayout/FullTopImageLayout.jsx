import Image from 'next/image';

import styles from './FullTopImageLayout.module.scss';

export default function FullTopImageLayout({ image, alt, children }) {
  return (
    <main className={styles.wrapper}>
      <section className={styles.top_image}>
        <Image src={image} alt={alt} layout="fill" objectFit="cover" />
      </section>

      <section className={styles.content}>{children}</section>
    </main>
  );
}
