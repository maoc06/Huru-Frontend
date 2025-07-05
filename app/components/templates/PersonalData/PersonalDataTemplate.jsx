import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { CheckCircle } from '@material-ui/icons';

import {
  setAbout,
  setEmail,
  setIdentityDocument,
} from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import userApi from '../../../api/UserAPI';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import Button from '../../elements/Button/Button';
import { WarningIcon } from '../../elements/Icons/Shared';
import Modal from '../../modules/Modal/Modal';
import SectionEditable from '../../modules/SectionEditable/SectionEditable';
import UserProfileBasicInfo from '../../modules/UserProfileBasicInfo/UserProfileBasicInfo';

import emailSchema from '../../../constants/validationSchema/email';
import userPhoneSchema from '../../../constants/validationSchema/userPhone';
import aboutUserSchema from '../../../constants/validationSchema/aboutUser';
import identityDocumentSchema from '../../../constants/validationSchema/identityDocument';

import styles from './PersonalDataTemplate.module.scss';

const PersonalDataTemplate = ({
  biography = '',
  birthday,
  indentityDocument = '1111111',
  userJoinAt,
  email = 'user@email.com',
  emailEditable = false,
  emailVerified = false,
  editablePicture = false,
  picture,
  phone = '+00 000-0000000',
  phoneCountryCode,
  phoneVerified = false,
  username = '',
  userId,
  editablePhone = true,
  editBiographyLocal = false,
  showDeleteBotton = true,
  showTitlePage = true,
  showBirthday = false,
  showIndentityDocument = false,
  showPassword = true,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const updateBiography = useApi(userApi.updateData);
  const updatePhone = useApi(userApi.updatePhone);

  const [openModal, setOpenModal] = useState(false);
  const [aboutValue, setAboutValue] = useState(biography);
  const [countryCode, setCountryCode] = useState(phoneCountryCode);
  const [idDocument, setIdDocument] = useState(indentityDocument);
  const [emailValue, setEmailValue] = useState(email);

  const handleEditBiography = async ({ biography }) => {
    if (editBiographyLocal) {
      setAboutValue(biography);
      dispatch(setAbout(biography));
    } else {
      await updateBiography.request({ uuid: userId, about: biography });

      if (updateBiography.error) {
        console.error('Ocurrio un error actualizando la biografia');
      } else {
        router.reload();
      }
    }
  };

  const handleEditPhone = async ({ phone }) => {
    await updatePhone.request({
      uuid: userId,
      phone: `+${countryCode}${phone.replace(/\D/g, '')}`,
    });

    if (updatePhone.error) {
      console.error('Ocurrio un error actualizando el telefono');
    } else {
      router.reload();
    }
  };

  const handleEditIdentityDocument = ({ indentityDocument }) => {
    setIdDocument(indentityDocument);
    dispatch(setIdentityDocument(indentityDocument));
  };

  const handleEditEmail = ({ email }) => {
    setEmailValue(email);
    dispatch(setEmail(email));
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

      <div className={styles.pageContainer}>
        {showTitlePage && <h1>Información personal</h1>}

        <div className={styles.section}>
          <UserProfileBasicInfo
            birthday={birthday}
            userId={userId}
            createdAt={userJoinAt}
            domain="Me uní"
            name={username}
            profilePicture={picture}
            showExtra={false}
            avatarSize="xl"
            withTopMargin={true}
            showBirthday={showBirthday}
            editablePicture={editablePicture}
            openInNewTab={false}
            cursorOnAvatar={true}
          />
          <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
            <h2 className={styles.sectionTitle}>Verificación de identidad</h2>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Correo electrónico</span>
            <span className={styles.verifiedBadge}>
              <CheckCircle />
              {emailVerified ? 'Verificado' : 'No verificado'}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Número de teléfono</span>
            <span className={styles.verifiedBadge}>
              <CheckCircle />
              {phoneVerified ? 'Verificado' : 'No verificado'}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <SectionEditable
            name="biography"
            onSave={handleEditBiography}
            schema={aboutUserSchema}
            title="Sobre ti"
            values={{ biography: aboutValue }}
          />
        </div>

        <div className={styles.section}>
          <SectionEditable
            name="email"
            type="email"
            title="Email"
            onSave={handleEditEmail}
            schema={emailSchema}
            values={{ email: emailValue }}
            isEditable={emailEditable}
          />

          {showPassword && (
            <SectionEditable
              title="Contraseña"
              isLink={true}
              href={'/profile/personal-data/password'}
            />
          )}

          {editablePhone ? (
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
          ) : (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Télefono</span>
              <span className={styles.infoValue}>{`${countryCode} ${phone}`}</span>
            </div>
          )}

          {showIndentityDocument && (
            <SectionEditable
              name="indentityDocument"
              onSave={handleEditIdentityDocument}
              schema={identityDocumentSchema}
              title="Documento de identidad"
              type="number"
              values={{ indentityDocument: idDocument }}
            />
          )}
        </div>

        {showDeleteBotton && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gestionar cuenta</h2>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>
                Eliminar tu cuenta de Huru
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => setOpenModal(true)}
              >
                Eliminar cuenta
              </button>
            </div>
            <p className={styles.deleteDescription}>
              Esta acción es permanente y no se puede deshacer.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalDataTemplate;
