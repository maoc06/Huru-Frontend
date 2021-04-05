import {useRouter} from 'next/router';

import styles from './RequestCard.module.scss';
import BasicInfoUserMin from '../BasicInfoUserMin/BasicInfoUserMin';

import formatShortDate from '../../../utils/formatShortDate';
import formatAMPM from '../../../utils/formatAMPM';
import { useEffect, useState } from 'react';

export default function RequestCard({
    guestName,
    guestImg,
    carName,
    carImg,
    dateStart,
    dateEnd,
    requestId
  }) {
    const router = useRouter();

    const dateStartInf = dateStart.split('T');
    const dateEndInf = dateEnd.split('T');



    const dateIn = formatShortDate(new Date (dateStartInf[0]));
    const timeIn = formatAMPM(dateStartInf[1]);
    const dateOut = formatShortDate(new Date(dateEndInf[0]));
    const timeOut = formatAMPM(dateEndInf[1]);

    const handleGoToDetails = () => {
      router.push(`/host/request-details/${requestId}`);
    }
   
    useEffect(()=>{
        
        

        
        

    },[])

    
    return (
        <>
       
      <div className={styles.container} onClick={handleGoToDetails}>
          <div className={styles.infoUser}>
                <BasicInfoUserMin
                name={guestName}
                urlImage={guestImg}
                />
                <div className={styles.line}></div>

                 <BasicInfoUserMin
                name={carName}
                urlImage={carImg}
                />
          </div>
          <p className={styles.date }>Fecha y hora de inicio</p>
          <p>{`${dateIn} ${timeIn.format.hours}:${timeIn.format.minutes} ${timeIn.format.range}`}</p>
          <p className={styles.date}>Fecha y hora de fin</p>
          <p>{`${dateOut} ${timeOut.format.hours} ${timeOut.format.minutes} ${timeOut.format.range} `}</p>
      </div>
      </>
    );
  }