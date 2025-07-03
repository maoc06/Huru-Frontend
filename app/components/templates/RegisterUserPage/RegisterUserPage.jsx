import { useState } from 'react';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import StepBarProgress from '../../elements/StepBarProgress/StepBarProgress';
import RegisterUserCredentials from '../../modules/RegisterUser/RegisterUserForm';
import RegisterUserPersonalData from '../../modules/RegisterUser/RegisterUserPersonalDataForm';
import RegisterUserPhone from '../../modules/RegisterUser/RegisterUserPhoneForm';
import ValidatePhone from '../../modules/RegisterUser/ValidatePhone/ValidatePhone';
import SelfieTime from '../../modules/RegisterUser/SelfieTime';
import Terms from '../../modules/RegisterUser/Terms';
import authNavStyles from '../../modules/NavBar/AuthNavBar.module.scss';

const RegisterUserPage = ({ onBackNavigation }) => {
  const numOfSteps = 6;
  const [step, setSetp] = useState(2);

  const handleBackNavigation = () => {
    if (step > 1) {
      setSetp(step - 1);
    } else if (onBackNavigation) {
      onBackNavigation();
    } else {
      // Fallback to browser back if no custom handler
      window.history.back();
    }
  };

  // Pass the back navigation handler to parent component if needed
  if (typeof window !== 'undefined' && window.registerUserBackHandler !== handleBackNavigation) {
    window.registerUserBackHandler = handleBackNavigation;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegisterUserCredentials setStep={setSetp} />;
      case 2:
        return <RegisterUserPersonalData setStep={setSetp} />;
      case 3:
        return <RegisterUserPhone setStep={setSetp} />;
      case 4:
        return <ValidatePhone setStep={setSetp} />;
      case 5:
        return <SelfieTime setStep={setSetp} />;
      case 6:
        return <Terms />;
      default:
        return null;
    }
  };

  return (
    <>
      <AppLayout 
        centerContent={true} 
        withLiquidBackground={true}
        withImage={false}
      >
        <div className={authNavStyles.authPageContent}>
          <StepBarProgress numOfSteps={numOfSteps} currStep={step} />
          {renderStep()}
        </div>
      </AppLayout>
    </>
  );
};

export default RegisterUserPage;
