import Link from 'next/link';

import styles from './TimelineElement.module.scss';

function TimelineElement({
  title = '',
  subtitle = [],
  linkText = '',
  href = '/',
  icon,
  backgroundColor = 'blue',
  isFirstElement = false,
  showLink = false,
}) {
  return (
    <section
      className={`${styles.container} ${
        backgroundColor === 'yellow' && styles.yellow
      } ${backgroundColor === 'red' && styles.red} ${
        backgroundColor === 'green' && styles.green
      } ${isFirstElement && styles.first}`}
    >
      <div className={styles.icon}>{icon}</div>

      <div className={styles.body}>
        <h6 className={styles.title}>{title}</h6>

        {subtitle.map((text) => {
          return (
            <p key={text} className={styles.subtitle}>
              {text}
            </p>
          );
        })}

        {showLink && (
          <Link href={href}>
            <a target="_blank">{linkText}</a>
          </Link>
        )}
      </div>
    </section>
  );
}

export default TimelineElement;
