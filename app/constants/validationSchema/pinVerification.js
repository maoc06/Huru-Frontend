import * as Yup from 'yup';

const pinVerificationSchema = Yup.object().shape({
  pin1: Yup.number().min(0).max(9).required(),
  pin2: Yup.number().min(0).max(9).required(),
  pin3: Yup.number().min(0).max(9).required(),
  pin4: Yup.number().min(0).max(9).required(),
});

export default pinVerificationSchema;
