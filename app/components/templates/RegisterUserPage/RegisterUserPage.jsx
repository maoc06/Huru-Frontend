import { useState } from 'react';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import StepBarProgress from '../../elements/StepBarProgress/StepBarProgress';
import RegisterUserCredentials from '../../modules/RegisterUser/RegisterUserForm';
import RegisterUserPersonalData from '../../modules/RegisterUser/RegisterUserPersonalDataForm';
import RegisterUserPhone from '../../modules/RegisterUser/RegisterUserPhoneForm';
import ValidatePhone from '../../modules/RegisterUser/ValidatePhone/ValidatePhone';
import Terms from '../../modules/RegisterUser/Terms';

const RegisterUserPage = () => {
  const numOfSteps = 5;
  const [step, setSetp] = useState(1);

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
        return <Terms />;
      default:
        return null;
    }
  };

  return (
    <>
      <StepBarProgress numOfSteps={numOfSteps} currStep={step} />
      <AppLayout centerContent={true}>{renderStep()}</AppLayout>
    </>
  );
};

export default RegisterUserPage;
