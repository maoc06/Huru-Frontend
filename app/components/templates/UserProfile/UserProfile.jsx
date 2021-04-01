import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {
  PersonOutlineOutlined,
  LocalAtmOutlined,
  DriveEtaOutlined,
  InfoOutlined,
  SecurityOutlined,
  HelpOutlineOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons';

import Avatar from '../../elements/Avatar/Avatar';
import ListItem from '../../elements/List/ListItem';

import styles from './UserProfile.module.scss';

const UserProfile = ({ user, onLogOut }) => {
  const { firstName, lastName } = user;

  return (
    <main className={styles.wrapper}>
      <header>
        <Avatar />
        <h5>
          {firstName} {lastName}
        </h5>
      </header>

      <section>
        <h6>Configuración de la cuenta</h6>

        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            text="Información personal"
            icon={<PersonOutlineOutlined />}
          />

          <Divider />

          <ListItem
            text="Metodos de pago"
            icon={<LocalAtmOutlined />}
            href="/profile/payment-methods"
          />

          <Divider />

          <ListItem text="Ser Huru Amigo" icon={<DriveEtaOutlined />} />

          <Divider />
        </List>
      </section>

      <section>
        <h6>Soporte</h6>

        <List component="nav" aria-label="main mailbox folders">
          <ListItem text="¿Cómo funciona Huru?" icon={<InfoOutlined />} />

          <Divider />

          <ListItem text="Centro de seguridad" icon={<SecurityOutlined />} />

          <Divider />

          <ListItem text="Ayuda" icon={<HelpOutlineOutlined />} />

          <Divider />
        </List>
      </section>

      <section>
        <ListItem
          text="Cerrar sesión"
          icon={<ExitToAppOutlined />}
          onSelect={onLogOut}
        />
      </section>
    </main>
  );
};

export default UserProfile;
