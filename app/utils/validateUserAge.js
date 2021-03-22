export default function validateMinimumAge(userDateBirth) {
  const dateNow = new Date();
  const dateBirthUser = new Date(userDateBirth);

  let diff = (dateNow.getTime() - dateBirthUser.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  const userYearsOld = Math.abs(Math.floor(diff / 365.25));

  if (userYearsOld < 19) return false;
  return true;
}
