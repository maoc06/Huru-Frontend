import { useDispatch } from 'react-redux';

import { setProfilePhoto } from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import userApi from '../../../api/UserAPI';

import UploadImageButton from '../../elements/Button/UploadImageButton';
import TitlePage from '../../elements/TitlePage/TitlePage';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import styles from './Register.module.scss';

export default function SelfieTime({ setStep }) {
  const dispatch = useDispatch();
  const uploadProfilePic = useApi(userApi.uploadProfilePic);

  const handleSelfie = async (formData) => {
    if (formData.get('file') !== undefined && formData.get('file') !== null) {
      const profilePicUrl = await uploadProfilePic.request(formData);

      dispatch(setProfilePhoto(profilePicUrl.data.url));
      setStep(6);
    }
  };

  return (
    <>
      <ActivityIndicator visible={uploadProfilePic.loading} />

      <div className={styles.container}>
        <TitlePage>Selfie de seguridad</TitlePage>

        <p>
          Para mantener la comunidad segura, es necesario que todos muestren sus
          rostro. Toma una foto donde se vea claramente tu cara.
        </p>

        <UploadImageButton onSelect={handleSelfie} />
      </div>
    </>
  );
}
