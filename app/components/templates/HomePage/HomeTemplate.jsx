import SearchForm from '../../modules/SearchForm/SearchForm';

import styles from './HomeTemplate.module.scss';

const HomeTemplate = () => {
  return (
    <section className={styles.top}>
      <h3>¿A dónde irás después?</h3>

      <SearchForm />
    </section>
  );
};

export default HomeTemplate;
