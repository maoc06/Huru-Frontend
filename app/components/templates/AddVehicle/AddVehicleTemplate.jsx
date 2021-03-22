import { useState } from 'react';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import FullTopImageLayout from '../../layouts/FullTopImageLayout/FullTopImageLayout';

import StepBarProgress from '../../elements/StepBarProgress/StepBarProgress';
import Intro from '../../modules/AddVehicle/Intro/Intro';
import IdentifyVIN from '../../modules/AddVehicle/IdentifyVIN/IdentifyVIN';
import IdentifyVehicle from '../../modules/AddVehicle/IdentifyVehicle/IdentifyVehicle';
import SelectFeatures from '../../modules/AddVehicle/SelectFeatures/SelectFeatures';
import Description from '../../modules/AddVehicle/Description/Description';
import LicensePlate from '../../modules/AddVehicle/LicensePlate/LicensePlate';
import AddPhotos from '../../modules/AddVehicle/AddPhotos/AddPhotos';
import SetPricePerDay from '../../modules/AddVehicle/Price/Price';
import AdvanceNotice from '../../modules/AddVehicle/AdvanceNotice/AdvanceNotice';
import MinTripDuration from '../../modules/AddVehicle/MinTripDuration/MinTripDuration';
import MaxTripDuration from '../../modules/AddVehicle/MaxTripDuration/MaxTripDuration';
import Terms from '../../modules/AddVehicle/Terms/Terms';

const AddVehcileTemplate = () => {
  const numOfSteps = 12;
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <FullTopImageLayout
            image={'/images/intro-add-vehicle.png'}
            alt={'Ganar dinero con mi carro'}
          >
            <AppLayout isFullHeigh={false}>
              <Intro setStep={setStep} next={2} />
            </AppLayout>
          </FullTopImageLayout>
        );
      case 2:
        return (
          <AppLayout>
            <IdentifyVIN setStep={setStep} next={3} />
          </AppLayout>
        );
      case 3:
        return (
          <AppLayout>
            <IdentifyVehicle setStep={setStep} next={4} />
          </AppLayout>
        );
      case 4:
        return (
          <AppLayout>
            <SelectFeatures setStep={setStep} next={5} />
          </AppLayout>
        );
      case 5:
        return (
          <AppLayout>
            <Description setStep={setStep} next={6} />
          </AppLayout>
        );
      case 6:
        return (
          <AppLayout>
            <LicensePlate setStep={setStep} next={7} />
          </AppLayout>
        );
      case 7:
        return (
          <AppLayout>
            <AddPhotos setStep={setStep} next={8} />
          </AppLayout>
        );
      case 8:
        return (
          <AppLayout>
            <SetPricePerDay setStep={setStep} next={9} />
          </AppLayout>
        );
      case 9:
        return (
          <AppLayout>
            <AdvanceNotice setStep={setStep} next={10} />
          </AppLayout>
        );
      case 10:
        return (
          <AppLayout>
            <MinTripDuration setStep={setStep} next={11} />
          </AppLayout>
        );
      case 11:
        return (
          <AppLayout>
            <MaxTripDuration setStep={setStep} next={12} />
          </AppLayout>
        );
      case 12:
        return (
          <AppLayout>
            <Terms />
          </AppLayout>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <StepBarProgress numOfSteps={numOfSteps} currStep={step} />
      {renderStep()}
    </>
  );
  // return (
  //   <AppLayout>
  //     <AddPhotos setStep={setStep} next={8} />
  //   </AppLayout>
  // );
};

export default AddVehcileTemplate;
