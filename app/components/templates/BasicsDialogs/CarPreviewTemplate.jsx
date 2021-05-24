import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import storageAuth from '../../../utils/storageAuth';
import { typeTransmissionEnum } from '../../../utils/enums';

import Carousel from '../../elements/Carousel/Carousel';
import CarProfileTemplate from '../CarProfile/CarProfileTempate';

const CarPreviewTemplate = () => {
  const car = useSelector((state) => state.vehicleRegister);

  const [user, setUser] = useState({});
  const [features, setFeatures] = useState([]);

  const convertFeatures = () => {
    let featuresArr = [];

    car.features.map((feature) => {
      featuresArr.push({ featureId: feature });
    });

    return featuresArr;
  };

  useEffect(() => {
    const user = storageAuth.getUser();
    if (user) setUser(user.info);

    setFeatures(convertFeatures());
  }, []);

  return (
    <>
      <Carousel images={car.photos} />

      <CarProfileTemplate
        carId={0}
        userId={user.uid}
        username={user.firstName}
        userPic={user.profilePicture}
        userJoinAt={new Date()}
        title={`${car.maker.name} ${car.model.name} ${car.year.year}`}
        description={car.description}
        numSeats={car.model.numOfSeats}
        typeTransmission={typeTransmissionEnum[car.model.transmissionId]}
        typeGas="extra"
        features={features}
        featuresInline={true}
        reviews={[]}
        withLinkToOwner={false}
      />
    </>
  );
};

export default CarPreviewTemplate;
