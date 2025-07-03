import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import FullTopImageLayout from '../../layouts/FullTopImageLayout/FullTopImageLayout';

import StepBarProgress from '../../elements/StepBarProgress/StepBarProgress';
import Intro from '../../modules/AddVehicle/Intro/Intro';
import IdentifyVIN from '../../modules/AddVehicle/IdentifyVIN/IdentifyVIN';
import IdentifyVehicle from '../../modules/AddVehicle/IdentifyVehicle/IdentifyVehicle';
import SelectFeatures from '../../modules/AddVehicle/SelectFeatures/SelectFeatures';
import SelectFuel from '../../modules/AddVehicle/SelectFuel/SelectFuel';
import Description from '../../modules/AddVehicle/Description/Description';
import LicensePlate from '../../modules/AddVehicle/LicensePlate/LicensePlate';
import AddPhotos from '../../modules/AddVehicle/AddPhotos/AddPhotos';
import SetPricePerDay from '../../modules/AddVehicle/Price/Price';
import AdvanceNotice from '../../modules/AddVehicle/AdvanceNotice/AdvanceNotice';
import MinTripDuration from '../../modules/AddVehicle/MinTripDuration/MinTripDuration';
import MaxTripDuration from '../../modules/AddVehicle/MaxTripDuration/MaxTripDuration';
import Terms from '../../modules/AddVehicle/Terms/Terms';
import SelectCity from '../../modules/AddVehicle/SelectCity/SelectCity';
import ProfileNavBar from '../../modules/NavBar/ProfileNavBar';

import { setCurrentStep } from '../../../redux/slices/vehicleRegisterSlice';

import styles from './AddVehicleTemplate.module.scss';

const BackArrowIcon = () => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M15 18L9 12L15 6" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Reusable Step Header
const StepHeader = ({ title, description, handleGoBack }) => (
    <div className={styles.stepHeaderWrapper}>
      <div className={styles.stepHeader}>
        <button className={styles.backButton} onClick={handleGoBack}>
          <BackArrowIcon />
        </button>
        <div className={styles.photosHeaderContent}>
          <h3>{title}</h3>
        </div>
      </div>
      {description && <section>{description}</section>}
    </div>
);

const AddVehcileTemplate = () => {
  const numOfSteps = 14;
  const dispatch = useDispatch();
  
  // Get current step from Redux state
  const savedStep = useSelector((state) => state.vehicleRegister.currentStep);
  const [step, setStep] = useState(savedStep || 1);

  // Save step to Redux whenever it changes
  useEffect(() => {
    dispatch(setCurrentStep(step));
  }, [step, dispatch]);

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <ProfileNavBar />
            <FullTopImageLayout
              image={'/images/intro-add-vehicle.jpg'}
              alt={'Ganar dinero con mi carro'}
            >
              <AppLayout
                centerContent={true}
                isFullHeigh={false}
                widthAdap={true}
                withLiquidBackground={true}
                withImage={false}
              >
                <Intro setStep={setStep} next={2} />
              </AppLayout>
            </FullTopImageLayout>
          </>
        );
      case 2:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
                <StepHeader title="Identifica tu carro" handleGoBack={handleGoBack} description={
                    <p>Usa el Número de Identificación del Vehículo (VIN) para identificar tu carro.</p>
                }/>
                <IdentifyVIN setStep={setStep} next={3} />
            </div>
          </AppLayout>
        );
      case 3:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
                <StepHeader title="Identifica tu carro" handleGoBack={handleGoBack} />
                <IdentifyVehicle setStep={setStep} next={4} />
            </div>
          </AppLayout>
        );
      case 4:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.featuresStepContainer}>
              <StepHeader title="Cuéntanos sobre tu carro" handleGoBack={handleGoBack} />
              <SelectFeatures setStep={setStep} next={5} />
            </div>
          </AppLayout>
        );
      case 5:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
              <StepHeader title="Cuéntanos sobre tu carro" handleGoBack={handleGoBack} description={
                <p>¿Qué tipo de combustible deberían usar para tu vehículo?</p>
              }/>
              <SelectFuel setStep={setStep} next={6} />
            </div>
          </AppLayout>
        );
      case 6:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
                <StepHeader title="Cuéntanos sobre tu carro" handleGoBack={handleGoBack} description={
                    <p>¿Dónde está ubicado tu vehículo?</p>
                }/>
              <SelectCity setStep={setStep} next={7} />
            </div>
          </AppLayout>
        );
      case 7:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
              <StepHeader title="Descripción" handleGoBack={handleGoBack} description={
                <>
                    <p>Cuéntale a todos las razones por las que conducir tu carro es una experiencia inigualable.</p>
                    <br />
                    <p>Recuerda que los vehículos con descripciones tienen más posibilidades de ser reservados, así que aprovecha este espacio.</p>
                </>
              }/>
              <Description setStep={setStep} next={8} />
            </div>
          </AppLayout>
        );
      case 8:
        return (
            <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
              <div className={styles.stepContainer}>
                <StepHeader title="Matrícula" handleGoBack={handleGoBack} description={
                  <p>Debemos conocer la matrícula de tu carro para realizar algunas validaciones. Esta información no será pública.</p>
                }/>
                <LicensePlate setStep={setStep} next={9} />
              </div>
            </AppLayout>
          );
      case 9:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.photosStepContainer}>
              <StepHeader title="Exhibe tu carro" handleGoBack={handleGoBack} description={
                  <>
                    <p>Toma fotos de alta calidad de tu carro.</p>
                    <br />
                    <p>Recuerda que unas buenas fotos pueden aumentar tus ingresos potenciales atrayendo a más clientes.</p>
                  </>
              }/>
              <AddPhotos setStep={setStep} next={10} />
            </div>
          </AppLayout>
        );
      case 10:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
              <StepHeader title="Precio" handleGoBack={handleGoBack} description={
                <p>Configura el precio base por día de alquiler de tu carro.</p>
              }/>
              <SetPricePerDay setStep={setStep} next={11} />
            </div>
          </AppLayout>
        );
      case 11:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
              <StepHeader title="¿Con cuánta antelación pueden reservar tu carro?" handleGoBack={handleGoBack} />
              <AdvanceNotice setStep={setStep} next={12} />
            </div>
          </AppLayout>
        );
      case 12:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
              <StepHeader title="¿Cúal será el viaje más corto que aceptarás?" handleGoBack={handleGoBack} />
              <MinTripDuration setStep={setStep} next={13} />
            </div>
          </AppLayout>
        );
      case 13:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
              <StepHeader title="¿Cúal será el viaje más largo que aceptarás?" handleGoBack={handleGoBack} />
              <MaxTripDuration setStep={setStep} next={14} />
            </div>
          </AppLayout>
        );
      case 14:
        return (
          <AppLayout centerContent={false} withLiquidBackground={true} withImage={false} isFullHeigh={false}>
            <div className={styles.stepContainer}>
                <StepHeader title="Terminamos" handleGoBack={handleGoBack} description={
                    <>
                        <p>Revisa la vista previa para asegurarte que todo está como lo deseas. Una vez aceptes los términos y políticas de Huru, un miembro del equipo de soporte validará la información del vehículo.</p>
                        <br />
                        <p>Si la información proporcionada es válida en menos de 48 horas el vehículo se hará público en nuestra plataforma y estará listo para ser reservado.</p>
                    </>
                }/>
              <Terms />
            </div>
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
};

export default AddVehcileTemplate;
