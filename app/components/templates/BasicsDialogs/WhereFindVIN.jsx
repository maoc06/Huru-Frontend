import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import styles from './default.module.scss';

const WhereFindVINTemplate = () => {
  return (
    <>
      <p className={styles.disclaimer}>
        Usamos el Número de Identificación del Vehículo (VIN) como identificador
        unico dentro de Huru. El VIN usualmente consiste en una cadena
        alfanumerica de 17 caracteres y un código de barras. Lo puedes encontrar
        en alguno de los siguentes sitios:
      </p>

      <SectionTitle title="1. Puerta del lado del conductor" marginTop={true} />
      <p>
        Con la puerta abierta, mire en el borde de la puerta o en el poste de la
        puerta (donde la puerta se engancha cuando está cerrada).
      </p>

      <SectionTitle
        title="2. Tablero del lado del conductor"
        marginTop={true}
      />
      <p>
        Párese fuera del automóvil y mire a través del parabrisas en la esquina
        inferior de su tablero.
      </p>

      <SectionTitle title="3. Documentación" marginTop={true} />
      <p>
        Verifique los títulos de su automóvil, el registro o los documentos del
        seguro.
      </p>

      <p className={styles.extraTopSpacing}>
        Si aún no puede encontrar su VIN, consulte el manual de su automóvil o
        el sitio web del fabricante para obtener instrucciones.
      </p>
    </>
  );
};

export default WhereFindVINTemplate;
