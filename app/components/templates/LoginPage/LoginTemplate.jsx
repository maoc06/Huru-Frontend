import Link from 'next/link';

import LoginForm from '../../modules/Forms/LoginForm';

import styles from './LoginTemplate.module.scss';

const LoginTemplate = () => {
  return (
    <>
      <LoginForm />

      <div className={styles.link_register}>
        <Link href="/signup">
          <a>¿Aún no estás en Huru? Regístrate</a>
        </Link>
      </div>
    </>
  );
};

export default LoginTemplate;
