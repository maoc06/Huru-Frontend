import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandMoreRounded } from '@material-ui/icons';

import { countryPhonesFormat } from '../../../constants/others/country-phones';

import styles from './CountryPicker.module.scss';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#070D9A',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CountryPicker({ setCountryCode }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [countrySelected, setCountrySelected] = useState(
    countryPhonesFormat[0]
  );

  useEffect(() => {
    setCountryCode(countrySelected.code);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCountry = (item) => {
    setCountrySelected(item);
    setCountryCode(item.code);
    handleClose();
  };

  return (
    <>
      <div className={styles.container} onClick={handleClick}>
        <Image src={countrySelected.flag} width={31} height={21} />
        <ExpandMoreRounded />
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {countryPhonesFormat.map((item) => {
          return (
            <StyledMenuItem
              key={item.id}
              onClick={() => handleSelectCountry(item)}
            >
              <ListItemIcon>
                <Image src={item.flag} width={31} height={21} />
              </ListItemIcon>
              <ListItemText primary={item.country} />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </>
  );
}
