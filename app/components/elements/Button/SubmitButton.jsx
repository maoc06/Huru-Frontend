import { useFormikContext } from 'formik';

import Button from './Button';

export default function SubmitButton({ children, marginTop }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button type="submit" onClick={handleSubmit} marginTop={marginTop}>
      {children}
    </Button>
  );
}
