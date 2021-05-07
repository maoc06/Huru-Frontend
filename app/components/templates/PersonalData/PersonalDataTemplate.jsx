import { useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import userApi from '../../../api/UserAPI';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import Button from '../../elements/Button/Button';
import { WarningIcon } from '../../elements/Icons/Shared';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import TitlePage from '../../elements/TitlePage/TitlePage';
import Modal from '../../modules/Modal/Modal';
import SectionEditable from '../../modules/SectionEditable/SectionEditable';
import UserProfileBasicInfo from '../../modules/UserProfileBasicInfo/UserProfileBasicInfo';

import userPhoneSchema from '../../../constants/validationSchema/userPhone';
import aboutUserSchema from '../../../constants/validationSchema/aboutUser';
import Divider from '../../elements/Divider/Divider';
import IndentityBadge from '../../modules/IndentityBadge/IndentityBadge';

const PersonalDataTemplate = ({
  biography = '',
  userJoinAt,
  email = 'user@email.com',
  emailVerified = false,
  picture,
  phone = '+00 000-0000000',
  phoneCountryCode,
  phoneVerified = false,
  username = '',
  userId,
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const updateBiography = useApi(userApi.updateData);
  const updatePhone = useApi(userApi.updatePhone);

  const [countryCode, setCountryCode] = useState(phoneCountryCode);

  const handleEditBiography = async ({ biography }) => {
    await updateBiography.request({ uuid: userId, about: biography });

    if (updateBiography.error) {
      console.log('Ocurrio un error actualizando la biografia');
    } else {
      router.reload();
    }
  };

  const handleEditPhone = async ({ phone }) => {
    await updatePhone.request({
      uuid: userId,
      phone: `+${countryCode}${phone.replace(/\D/g, '')}`,
    });

    if (updatePhone.error) {
      console.log('Ocurrio un error actualizando el telefono');
    } else {
      router.reload();
    }
  };

  const handleDeleteAccount = () => {
    console.log('delete account');
  };

  return (
    <>
      <ActivityIndicator
        visible={updateBiography.loading || updatePhone.loading}
      />

      <Modal
        title="¿Eliminar cuenta?"
        content="Al eliminar tu cuenta, tu historial de viajes, información personal y de pagos se perderá de forma permanente. Esta acción tendra efecto inmediato y es irrevesible."
        icon={<WarningIcon />}
        visible={openModal}
        confirmText="Eliminar"
        onConfirm={handleDeleteAccount}
        onReject={() => setOpenModal(false)}
        onCloseModal={() => setOpenModal(false)}
      />

      <TitlePage>Información personal</TitlePage>

      <UserProfileBasicInfo
        userId={userId}
        createdAt={userJoinAt}
        domain="Me uní"
        name={username}
        profilePicture={picture}
        showExtra={false}
        avatarSize="xl"
        withTopMargin={true}
      />

      <Divider size="mediumTop" />

      <SectionTitle title="Verificación de identidad" />
      <IndentityBadge
        checked={emailVerified}
        title={
          emailVerified
            ? 'Correo electrónico verificado'
            : 'Correo electrónico sin verificar'
        }
      />
      <IndentityBadge
        checked={phoneVerified}
        title={
          phoneVerified
            ? 'Número de teléfono verificado'
            : 'Número de teléfono sin verificar'
        }
      />

      <Divider size="mediumTop" />

      <SectionEditable
        name="biography"
        onSave={handleEditBiography}
        schema={aboutUserSchema}
        title="Biografía"
        values={{ biography }}
      />

      <Divider size="mediumTop" />

      <SectionEditable
        name="email"
        title="Email"
        values={{ email }}
        isEditable={false}
      />

      <Divider size="mediumTop" />

      <SectionEditable
        title="Contraseña"
        isLink={true}
        href={'/profile/personal-data/password'}
      />

      <Divider size="mediumTop" />

      <SectionEditable
        name="phone"
        onSave={handleEditPhone}
        schema={userPhoneSchema}
        title="Télefono"
        type="phone"
        values={{ phone }}
        countryCode={countryCode}
        onSelectPhoneCountry={setCountryCode}
      />

      <Divider size="mediumTop" />

      <Button
        isSecondary={true}
        onClick={() => setOpenModal(true)}
        marginTop={true}
      >
        Eliminar cuenta
      </Button>
    </>
  );
};

export default PersonalDataTemplate;
