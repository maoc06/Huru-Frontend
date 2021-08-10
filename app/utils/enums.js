import { addHours, addDays, addWeeks, addMonths } from 'date-fns';

// Car features icon
import Wheelchair from '../components/elements/Icons/Features/Wheelchair';
import AllWheelDrive from '../components/elements/Icons/Features/AllWheelDrive';
import PlayButton from '../components/elements/Icons/Features/PlayButton';
import InputAux from '../components/elements/Icons/Features/InputAux';
import BackupCamera from '../components/elements/Icons/Features/BackupCamera';
import Bike from '../components/elements/Icons/Features/Bike';
import BlindPoints from '../components/elements/Icons/Features/BlindPoints';
import Bluetooth from '../components/elements/Icons/Features/Bluetooth';
import ChildSeat from '../components/elements/Icons/Features/ChildSeat';
import Gps from '../components/elements/Icons/Features/Gps';
import HeatedSeat from '../components/elements/Icons/Features/HeatedSeat';
import KeylessEntry from '../components/elements/Icons/Features/KeylessEntry';
import PetFriendly from '../components/elements/Icons/Features/PetFriendly';
import UsbChanger from '../components/elements/Icons/Features/UsbChanger';
import UsbInput from '../components/elements/Icons/Features/UsbInput';

// Car brands logo
import AudiLogo from '../components/elements/Icons/CarLogos/AudiLogo';
import BMWLogo from '../components/elements/Icons/CarLogos/BMWLogo';
import ChevroletLogo from '../components/elements/Icons/CarLogos/ChevroletLogo';
import DodgeLogo from '../components/elements/Icons/CarLogos/DodgeLogo';
import FordLogo from '../components/elements/Icons/CarLogos/FordLogo';
import JeepLogo from '../components/elements/Icons/CarLogos/JeepLogo';
import KiaLogo from '../components/elements/Icons/CarLogos/KiaLogo';
import MazdaLogo from '../components/elements/Icons/CarLogos/MazdaLogo';
import MercedesBenzLogo from '../components/elements/Icons/CarLogos/MercedesBenzLogo';
import MiniLogo from '../components/elements/Icons/CarLogos/MiniLogo';
import NissanLogo from '../components/elements/Icons/CarLogos/NissanLogo';
import RenaultLogo from '../components/elements/Icons/CarLogos/RenaultLogo';
import ToyotaLogo from '../components/elements/Icons/CarLogos/ToyotaLogo';
import VolkswagenLogo from '../components/elements/Icons/CarLogos/VolkswagenLogo';

// Car type icons
import CarType from '../components/elements/Icons/CarTypes/CarType';
import ConvertibleType from '../components/elements/Icons/CarTypes/ConvertibleType';
import LuxuryType from '../components/elements/Icons/CarTypes/LuxuryType';
import MiniVanType from '../components/elements/Icons/CarTypes/MiniVanType';
import SportsType from '../components/elements/Icons/CarTypes/SportsType';
import SuvType from '../components/elements/Icons/CarTypes/SuvType';
import VanType from '../components/elements/Icons/CarTypes/VanType';
import ElectricType from '../components/elements/Icons/CarTypes/ElectricType';

// Payment methods icons
import VisaIcon from '../components/elements/Icons/PaymentMethods/VisaIcon';
import MastercardIcon from '../components/elements/Icons/PaymentMethods/MastercardIcon';
import AmexIcon from '../components/elements/Icons/PaymentMethods/AmexIcon';
import NequiIcon from '../components/elements/Icons/PaymentMethods/NequiIcon';

// type Transmissions
const typeTransmissionEnum = Object.freeze({ 1: 'Manual', 2: 'Automático' });

// type Fuel
const typeFuelEnum = Object.freeze({
  1: 'Corriente',
  2: 'Extra',
  3: 'ACPM',
  4: 'Gas Natural',
  5: 'Eléctrico',
});

// Advance notice
const advanceNotice = Object.freeze({
  1: new Date(),
  2: addHours(new Date(), 6),
  3: addHours(new Date(), 12),
  4: addDays(new Date(), 1),
});

// Max trip duration
const maxTripDuration = Object.freeze({
  1: addDays(new Date(), 5),
  2: addWeeks(new Date(), 1),
  3: addWeeks(new Date(), 2),
  4: addMonths(new Date(), 1),
  5: addMonths(new Date(), 3),
  6: new Date(),
});

// Min trip duration
const minTripDuration = Object.freeze({
  1: addDays(new Date(), 1),
  2: addDays(new Date(), 2),
  3: addDays(new Date(), 3),
  4: addDays(new Date(), 4),
  5: addDays(new Date(), 5),
});

// Car brands logo
const carBrandLogos = Object.freeze({
  1: <AudiLogo />,
  2: <BMWLogo />,
  3: <ChevroletLogo />,
  4: <DodgeLogo />,
  5: <FordLogo />,
  6: <JeepLogo />,
  7: <KiaLogo />,
  8: <MazdaLogo />,
  9: <MercedesBenzLogo />,
  10: <MiniLogo />,
  11: <NissanLogo />,
  12: <RenaultLogo />,
  13: <ToyotaLogo />,
  14: <VolkswagenLogo />,
});

// Car features icon
const carFeaturesIcons = Object.freeze({
  1: <Wheelchair />,
  2: <AllWheelDrive />,
  3: <PlayButton />,
  4: <PlayButton />,
  5: <InputAux />,
  6: <BackupCamera />,
  7: <Bike />,
  8: <BlindPoints />,
  9: <Bluetooth />,
  10: <ChildSeat />,
  11: <Gps />,
  12: <HeatedSeat />,
  13: <KeylessEntry />,
  14: <PetFriendly />,
  16: <UsbChanger />,
  17: <UsbInput />,
});

// Car features name
const carFeaturesNames = Object.freeze({
  1: 'accesibilidad para silla de ruedas',
  2: 'tracción en las cuatro ruedas',
  3: 'android auto',
  4: 'apple CarPlay',
  5: 'entrada AUX',
  6: 'camara trasera',
  7: 'portabicicletas',
  8: 'alerta de puntos ciegos',
  9: 'bluetooth',
  10: 'asiento para niños',
  11: 'gps',
  12: 'asientos con calefacción',
  13: 'entrada sin llave',
  14: 'pet friendly',
  16: 'cargador USB',
  17: 'entrada USB',
});

// Car types icons
const carTypesIcons = Object.freeze({
  1: <CarType />,
  2: <SportsType />,
  3: <SuvType />,
  4: <ConvertibleType />,
  5: <MiniVanType />,
  6: <LuxuryType />,
  7: <VanType />,
  8: <ElectricType />,
});

// Payment methods icons
const paymentMethodsIcons = Object.freeze({
  VISA: <VisaIcon />,
  MASTERCARD: <MastercardIcon />,
  AMEX: <AmexIcon />,
  NEQUI: <NequiIcon />,
});

const odometerRange = Object.freeze({
  1: '0-50k Km',
  2: '50k-100k Km',
  3: '100k-130k Km',
  4: '130k+ Km',
});

export {
  advanceNotice,
  typeTransmissionEnum,
  carBrandLogos,
  carFeaturesIcons,
  carFeaturesNames,
  carTypesIcons,
  paymentMethodsIcons,
  maxTripDuration,
  minTripDuration,
  odometerRange,
  typeFuelEnum,
};
