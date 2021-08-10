import { convertToCompound } from '../../../utils/formatDates';
import { withExtraLabelGuests } from '../../../utils/extraLabelText';

import CardHorizontal from '../../modules/CardHorizontal/CardHorizontal';
import styles from './TripsTemplate.module.scss';
import NotFound from '../../modules/NotFound/NotFound';

const TripsTemplate = ({ renderList, domain }) => {
  return (
    <section className={styles.content}>
      {renderList.length === 0 && (
        <p className={styles.empty}>
          {domain === 'upcoming' ? (
            <NotFound
              text="No hay ninguna reserva próxima para mostrar"
              subtitle="Busca un vehículo de tu conveniencia, realiza la reserva y aparecerá aquí listado."
            />
          ) : (
            <NotFound
              text="No hay ningun histórico de reservas para mostrar."
              subtitle="Después de culminar un servicio aparecerá aquí listado, manteniendo un histórico de tus reservas culminadas."
            />
          )}
        </p>
      )}

      {renderList.map((item) => {
        const {
          id,
          checkin,
          checkout,
          bookingStatus,
          bookedCar: { maker, model, year, images },
          alreadyReviewed,
        } = item || {};

        const extraLabel = withExtraLabelGuests({
          already: alreadyReviewed,
          status: bookingStatus,
          checkout,
        });

        return (
          <CardHorizontal
            dates={convertToCompound({ dateOne: checkin, dateTwo: checkout })}
            key={id}
            slug={id}
            title={`${maker.name} ${model.name} ${year}`}
            showPanelDates={true}
            imageSrc={images[0].imagePath}
            href={`/trips/${domain}/${encodeURIComponent(id)}`}
            withExtraLabel={extraLabel.show}
            extraLabelText={extraLabel.text}
            extraLabelColor={extraLabel.color}
          />
        );
      })}
    </section>
  );
};

export default TripsTemplate;
