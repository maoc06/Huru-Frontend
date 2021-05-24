import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import styles from './default.module.scss';

const CarTermOfServiceTemplate = () => {
  return (
    <>
      <p className={styles.disclaimer}>
        POR FAVOR LEA ESTOS TÉRMINOS DE SERVICIO DETENIDAMENTE YA QUE CONTIENEN
        INFORMACIÓN IMPORTANTE QUE AFECTA SUS DERECHOS, RECURSOS Y OBLIGACIONES.
        INCLUYEN UN ACUERDO DE ARBITRAJE (A MENOS QUE USTED OPTE POR SALIR).
        ESTOS TÉRMINOS TAMBIÉN INCLUYEN UNA PROHIBICIÓN DE ACCIONES COLECTIVAS Y
        REPRESENTATIVAS Y ALIVIO NO INDIVIDUALIZADO PARA TODOS LOS ASUNTOS, YA
        SEA EN TRIBUNAL O ARBITRAJE, DIVERSAS LIMITACIONES Y EXCLUSIONES, UNA
        CLÁUSULA QUE RIGE LA JURISDICCIÓN, EL DERECHO, LA EXPEDICIÓN Y LA
        APLICACIÓN DE LA LEY OBLIGACIONES DE CUMPLIMIENTO DE LAS LEYES Y
        NORMATIVAS APLICABLES.
      </p>

      <SectionTitle title="Introducción" marginTop={true} />
      <p>
        Huru y sus subsidiarias (colectivamente, "Huru", "nosotros" o "nos"),
        brindan una plataforma para compartir autos en línea que conecta a los
        propietarios de vehículos con viajeros y lugareños que buscan reservar
        esos vehículos. Se puede acceder a Huru en línea, incluso en huru.com y
        como una aplicación para dispositivos móviles. Los sitios web, el blog,
        las aplicaciones móviles y los servicios asociados de Huru se denominan
        colectivamente "los Servicios". Al acceder o utilizar los Servicios,
        incluso al comunicarse con nosotros u otros usuarios de Huru, usted
        acepta cumplir y estar legalmente obligado por las disposiciones de
        estos Términos de servicio (estos "Términos"), ya sea que se registre o
        no usuario de los Servicios. Estos Términos rigen su acceso y uso de los
        Servicios y constituyen un acuerdo legal vinculante entre usted y Huru.
        Estos Términos, junto con la Política de privacidad de Huru, los
        términos y certificados de seguros aplicables, los términos de
        asistencia en el camino y las Políticas de usuario accesibles a través
        de los Servicios (las "Políticas") constituyen el "Acuerdo" entre usted
        y Huru (cada uno es una "Parte" y juntos , "las fiestas").
      </p>
    </>
  );
};

export default CarTermOfServiceTemplate;
