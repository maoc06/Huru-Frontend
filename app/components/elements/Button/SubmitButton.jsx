import { useFormikContext } from 'formik';

import Button from './Button';

export default function SubmitButton({ children, marginTop, invert = false }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      marginTop={marginTop}
      invert={invert}
    >
      {children}
    </Button>
  );
}
