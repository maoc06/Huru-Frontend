import Button from './Button';

import styles from './UploadImageButton.module.scss';

export default function UploadImageButton({
  text = 'Continuar',
  onSelect = () => {},
}) {
  const handleCapture = (event) => {
    const capture = event.target;
    if (capture.files && capture.files.length !== 0) {
      const file = capture.files[0];

      const formData = new FormData();
      formData.append('file', file);

      onSelect(formData);
    }
  };

  const handleClick = () => {
    document.getElementById('photo-input').click();
  };

  return (
    <div onClick={handleClick} className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleCapture}
        id="photo-input"
      />
      <Button marginTop={true}>{text}</Button>
    </div>
  );
}
