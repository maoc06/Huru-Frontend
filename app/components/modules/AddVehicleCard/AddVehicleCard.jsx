import Image from 'next/image';
import Link from 'next/link';

import styles from './AddVehicleCard.module.scss';

export default function AddVehicleCard() {
  return (
    <Link href="/add-vehicle">
      <a className={styles.card}>
        <div className={styles.action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="none"
            viewBox="0 0 41 41"
          >
            <path
              stroke="#070D9A"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M20.143 5.036v15.107m0 15.107V20.143m0 0H35.25m-15.107 0H5.036"
            ></path>
          </svg>

          <h6>Agregar vehículo</h6>
        </div>

        <div className={styles.image}>
          <Image
            src={'/images/default-car.png'}
            alt={'agregar vehiculo'}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </a>
    </Link>
  );
}
