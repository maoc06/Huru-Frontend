import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import styles from './default.module.scss';

const PrivacyPolicyTemplate = () => {
  return (
    <>
      <p>
        Huru Inc. y sus subsidiarias (colectivamente, "Huru", "nosotros" o
        "nos") se preocupan por la privacidad y quieren que esté familiarizado
        con la forma en que recopilamos, usamos, procesamos y divulgamos su
        información personal. Esta Política de privacidad describe nuestras
        prácticas de privacidad en relación con nuestros sitios web y
        aplicaciones que se vinculan a esta Política de privacidad
        (colectivamente, los "Servicios") y nuestras interacciones fuera de
        línea con usted en las configuraciones donde publicamos esta Política de
        privacidad.
      </p>

      <SectionTitle
        title="Información personal que recopilamos"
        marginTop={true}
      />
      <p>
        Recopilamos tres categorías de información personal: información
        personal que nos proporciona; información personal recopilada
        automáticamente a partir de su uso de los Servicios; e información
        personal de fuentes de terceros.
      </p>
      <h6 className={styles.extraTopSpacing}>
        Información personal que nos proporciona
      </h6>
      <p>
        <span className={styles.inlineTitle}>Datos de la cuenta.</span> Cuando
        se registra para obtener una cuenta con nosotros, necesitamos cierta
        información personal para abrir su cuenta, como su nombre, dirección de
        correo electrónico y contraseña.
      </p>
    </>
  );
};

export default PrivacyPolicyTemplate;
