import Button from '../../../elements/Button/Button';
import styles from './Intro.module.scss';

export default function Intro({ setStep, next }) {
  return (
    <div className={styles.container}>
      <h3>Gana dinero como Huru Amigo</h3>

      <article className={styles.content}>
        <p>
          Únete a nuestra comunidad de Huru Amigos listando tu carro y permite
          que otros puedan usarlo para llegar a sus metas.
        </p>

        <br />

        <p>
          Los Huru Amigos usan los ingresos extras para pagar los gastos del
          carro o incluso ahorrar para cumplir un sueño.
        </p>
      </article>

      <Button onClick={() => setStep(next)}>Empezar</Button>
    </div>
  );
}
