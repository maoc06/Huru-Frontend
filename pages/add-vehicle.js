import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setVehicleOptions } from '../app/redux/slices/vehicleRegisterObjectsSlice';

import useApi from '../app/hooks/useApi';
import makerApi from '../app/api/MakerAPI';
import vehicleBasicsApi from '../app/api/VehicleBasicsAPI';

import AddVehicleTemplate from '../app/components/templates/AddVehicle/AddVehicleTemplate';

import ActivityIndicator from '../app/components/elements/ActivityIndicator/ActivityIndicator';

export default function AddVehicle() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const makersApi = useApi(makerApi.getMakers);
  const modelsApi = useApi(vehicleBasicsApi.getVehicleModels);
  const transmissionsApi = useApi(vehicleBasicsApi.getTransmissions);
  const odometerApi = useApi(vehicleBasicsApi.getOdometerRanges);
  const featuresApi = useApi(vehicleBasicsApi.getFeaturesOptions);
  const advanceNoticesApi = useApi(vehicleBasicsApi.getAdvanceNotices);
  const minTripOptionsApi = useApi(vehicleBasicsApi.getMinTrip);
  const maxTripOptionsApi = useApi(vehicleBasicsApi.getMaxTrip);
  const fuelOptionsApi = useApi(vehicleBasicsApi.getFuelOptions);

  const handleData = async () => {
    let res;
    setLoading(true);

    res = await makersApi.request();
    const makers = res.data.data;

    res = await modelsApi.request();
    const vehicleModels = res.data.data;

    res = await transmissionsApi.request();
    const transmissions = res.data.data;

    res = await odometerApi.request();
    const odometerRanges = res.data.data;

    res = await featuresApi.request();
    const featuresOptions = res.data.data;

    res = await advanceNoticesApi.request();
    const advanceNotices = res.data.data;

    res = await minTripOptionsApi.request();
    const minTripOptions = res.data.data;

    res = await maxTripOptionsApi.request();
    const maxTripOptions = res.data.data;

    res = await fuelOptionsApi.request();
    const fuelOptions = res.data.data;

    dispatch(
      setVehicleOptions({
        makers,
        vehicleModels,
        transmissions,
        odometerRanges,
        featuresOptions,
        advanceNotices,
        minTripOptions,
        maxTripOptions,
        fuelOptions,
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <Head>
        <title>Huru | Agregar nuevo vehículo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <>
        <ActivityIndicator visible={loading} />

        <AddVehicleTemplate />
      </>
    </div>
  );
}
