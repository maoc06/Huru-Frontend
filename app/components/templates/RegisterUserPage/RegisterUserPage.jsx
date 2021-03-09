import { useState } from 'react';

import RegisterUserCredentials from '../../modules/RegisterUser/RegisterUserForm';
import RegisterUserPersonalData from '../../modules/RegisterUser/RegisterUserPersonalDataForm';
import RegisterUserPhone from '../../modules/RegisterUser/RegisterUserPhoneForm';
import ValidatePhone from '../../modules/RegisterUser/ValidatePhone';
import Terms from '../../modules/RegisterUser/Terms';

const RegisterUserPage = () => {
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

  return <>{renderStep()}</>;
  // return (
  //   <>
  //     <Terms />
  //   </>
  // );
};

export default RegisterUserPage;
