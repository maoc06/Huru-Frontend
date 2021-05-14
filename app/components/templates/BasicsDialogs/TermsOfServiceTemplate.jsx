import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import styles from './default.module.scss';

const TermOfServiceTemplate = () => {
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

      <SectionTitle
        title="Elegibilidad, registro, verificación"
        marginTop={true}
      />
      <h6>Elegibilidad</h6>
      <p>
        Los Servicios están destinados únicamente a personas mayores de 19 años.
        Cualquier uso de los Servicios por cualquier persona que no cumpla con
        estos requisitos de edad está expresamente prohibido.
      </p>
      <h6 className={styles.extraTopSpacing}>Registro</h6>
      <p>
        Para acceder a ciertas funciones de los Servicios, debe registrarse para
        obtener una cuenta con nosotros (una "Cuenta Huru"). Puede crear una
        cuenta Huru proporcionándonos su nombre y apellido, dirección de correo
        electrónico y creando una contraseña o conectándose a través de una
        cuenta con un sitio o servicio de terceros (incluidos Facebook y
        Google). Cuando reserva un vehículo como viajero o invitado
        ("invitado"), nos proporciona cierta información adicional sobre usted.
        De manera similar, cuando enumera un vehículo como propietario o
        anfitrión del vehículo ("anfitrión"), nos proporciona cierta información
        adicional sobre usted y su (s) vehículo (s) (si corresponde). Debe
        proporcionar información precisa, actual y completa durante el proceso
        de registro, reserva y / o listado. Debe mantener su Cuenta Huru
        actualizada en todo momento. Según la información que proporcione, Huru
        puede imponer requisitos adicionales para que reserve un viaje (por
        ejemplo, proporcionar un depósito, agregar una segunda forma de pago,
        comprar un cierto nivel de plan de protección u otros requisitos).
      </p>
      <h6 className={styles.extraTopSpacing}>Verificación</h6>
      <p>
        Cuando esté permitido, Huru tiene el derecho, pero no la obligación, de
        realizar evaluaciones, controles y participar en procesos diseñados para
        (1) ayudar a verificar las identidades o verificar los antecedentes de
        los usuarios, incluido el historial de conducción y la validez de la
        licencia de conducir y (2) Verifique los detalles del vehículo. Huru no
        respalda ningún vehículo, usuario o antecedentes de un usuario, ni se
        compromete a realizar ningún proceso de selección específico. Huru
        puede, a su exclusivo criterio, utilizar servicios de terceros para
        verificar la información que nos proporciona y para obtener información
        adicional relacionada y correcciones cuando corresponda, y por la
        presente autoriza a Huru a solicitar, recibir, usar y almacenar dicha
        información. Huru puede permitir o rechazar su solicitud de reservar o
        listar un vehículo a su exclusivo y absoluto criterio. Huru puede, pero
        no se compromete a, realizar esfuerzos para garantizar la seguridad de
        los vehículos compartidos a través de los Servicios. No hacemos ninguna
        declaración sobre, confirmamos ni respaldamos la seguridad, la aptitud
        para la circulación o el estado legal de ningún vehículo más allá de
        nuestras políticas que requieren que los anfitriones se aseguren de que
        sus vehículos estén en condiciones seguras y operables, registrados
        legalmente para ser conducidos en vías públicas, tienen un título limpio
        (p. ej., no recuperado / sin marca / no lavado / no cancelado), no
        sujeto a ningún retiro de seguridad aplicable, y que de otra manera
        satisfaga nuestros requisitos de elegibilidad. Autorización de informe
        del consumidor. Cuando intenta reservar o listar un vehículo, o en
        cualquier momento después de que Huru crea razonablemente que puede
        haber un mayor nivel de riesgo asociado con su Cuenta Huru, por la
        presente proporciona a Huru instrucciones escritas y autoriza a Huru, de
        acuerdo con el Crédito Justo. Ley de Informes, leyes de informes del
        consumidor aplicables o cualquier ley similar para obtener su puntaje de
        seguro de automóvil personal y / o comercial, informe de crédito y / o
        realizar una verificación de antecedentes, incluida una verificación de
        antecedentes penales cuando lo permita la ley aplicable.
      </p>
    </>
  );
};

export default TermOfServiceTemplate;
