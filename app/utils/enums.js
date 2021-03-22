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
import ChevroletLogo from '../components/elements/Icons/CarLogos/ChevroletLogo';
import FordLogo from '../components/elements/Icons/CarLogos/FordLogo';
import MazdaLogo from '../components/elements/Icons/CarLogos/MazdaLogo';
import NissanLogo from '../components/elements/Icons/CarLogos/NissanLogo';
import RenaultLogo from '../components/elements/Icons/CarLogos/RenaultLogo';

// Car type icons
import CarType from '../components/elements/Icons/CarTypes/CarType';
import ConvertibleType from '../components/elements/Icons/CarTypes/ConvertibleType';
import LuxuryType from '../components/elements/Icons/CarTypes/LuxuryType';
import MiniVanType from '../components/elements/Icons/CarTypes/MiniVanType';
import SportsType from '../components/elements/Icons/CarTypes/SportsType';
import SuvType from '../components/elements/Icons/CarTypes/SuvType';
import VanType from '../components/elements/Icons/CarTypes/VanType';

// type Transmissions
const typeTransmissionEnum = Object.freeze({ 1: 'Manual', 2: 'Automático' });

// Car brands logo
const carBrandLogos = Object.freeze({
  1: <RenaultLogo />,
  2: <ChevroletLogo />,
  3: <MazdaLogo />,
  4: <FordLogo />,
  5: <NissanLogo />,
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

// Car types icons
const carTypesIcons = Object.freeze({
  1: <CarType />,
  2: <SportsType />,
  3: <SuvType />,
  4: <ConvertibleType />,
  5: <MiniVanType />,
  6: <LuxuryType />,
  7: <VanType />,
});

export { typeTransmissionEnum, carBrandLogos, carFeaturesIcons, carTypesIcons };
