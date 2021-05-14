import { useSelector } from 'react-redux';

import PersonalDataTemplate from '../PersonalData/PersonalDataTemplate';

const UserPreviewTemplate = () => {
  const user = useSelector((state) => state.userRegister);

  return (
    <PersonalDataTemplate
      birthday={user.dateOfBirth}
      biography={
        user.about
          ? user.about
          : 'Aún no tienes una descripción detallada de ti.'
      }
      userJoinAt={new Date()}
      email={user.email}
      editBiographyLocal={true}
      emailEditable={true}
      emailVerified={false}
      phone={user.phone.slice(3)}
      phoneCountryCode={user.phone.slice(0, 3)}
      phoneVerified={user.isPhoneVerified}
      picture={user.profilePhoto}
      username={`${user.firstName} ${user.lastName}`}
      indentityDocument={user.identityDocument}
      editablePhone={false}
      showDeleteBotton={false}
      showTitlePage={false}
      showBirthday={true}
      showIndentityDocument={true}
      showPassword={false}
    />
  );
};

export default UserPreviewTemplate;
