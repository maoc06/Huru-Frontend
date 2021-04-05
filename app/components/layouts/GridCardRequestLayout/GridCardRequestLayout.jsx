
import RequestCard from '../../elements/RequestCard/RequestCard';

import style from './GridCardRequestLayout.module.scss';

export default function GridCardRequsetLayout({requestList}){

    

    return(

        <>
         <h6>Solicitudes recientes</h6>
         {requestList.length===0 && <p>Ni hay nada</p>}
        <div className={style.container}>
            {requestList.slice(0,4).map(request => {
              return <RequestCard 
              key={request.booking_id}
              guestName = 'guest'
              guestImg= 'guestImage'
              carName= 'name'
              carImg= 'carImage'
              dateStart= {request.check_in_date}
              dateEnd= {request.check_out_date}
              requestId= {request.booking_id}
              />
            })}
        </div>
        </>
    );

}