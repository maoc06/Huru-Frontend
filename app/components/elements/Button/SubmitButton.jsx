import { useFormikContext } from 'formik';

import Button from './Button';

export default function SubmitButton({
  children,
  marginTop,
  invert = false,
  isDisabled = false,
  ...otherProps
}) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      marginTop={marginTop}
      invert={invert}
      isDisabled={isDisabled}
      {...otherProps}
    >
      {children}
    </Button>
  );
}
