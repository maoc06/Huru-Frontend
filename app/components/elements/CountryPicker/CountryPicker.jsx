import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandMoreRounded, Check } from '@material-ui/icons';

import { countryPhonesFormat } from '../../../constants/others/country-phones';

import styles from './CountryPicker.module.scss';

const StyledMenu = withStyles({
  paper: {
    border: '2px solid #E0E0E0',
    borderRadius: '16px',
    maxHeight: '300px',
    overflowY: 'auto',
    marginTop: '8px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#F6FFFC',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BDBDBD',
      borderRadius: '4px',
      '&:hover': {
        background: '#A1A1A1',
      },
    },
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
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    margin: '4px 8px',
    borderRadius: '12px',
    '&.selected': {
      backgroundColor: 'rgba(7, 13, 154, 0.08)',
      '& .MuiListItemIcon-root': {
        minWidth: '40px',
      },
      '& .checkIcon': {
        display: 'block',
        color: theme.palette.primary.main,
      },
      '& .MuiListItemText-primary': {
        fontWeight: 500,
      }
    },
    '&:hover': {
      backgroundColor: 'rgba(7, 13, 154, 0.04)',
    },
    '& .checkIcon': {
      display: 'none',
      fontSize: '20px',
    },
    '& .MuiListItemIcon-root': {
      minWidth: '40px',
      display: 'flex',
      alignItems: 'center',
      '& > span': {
        borderRadius: '4px',
        overflow: 'hidden',
      }
    },
    '& .MuiListItemText-primary': {
      marginRight: '16px',
      fontSize: '14px',
      color: '#4F4F4F',
    }
  },
}))(MenuItem);

export default function CountryPicker({ setCountryCode, initialCode = '57' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [countrySelected, setCountrySelected] = useState(
    countryPhonesFormat[0]
  );

  useEffect(() => {
    const country = countryPhonesFormat.find(
      (country) => country.code === initialCode
    );

    setCountrySelected(country);
    setCountryCode(country.code);
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
        <ExpandMoreRounded 
          className={`${styles.arrow} ${Boolean(anchorEl) ? styles.arrowOpen : ''}`}
        />
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {countryPhonesFormat.map((item) => {
          const isSelected = item.code === countrySelected.code;
          return (
            <StyledMenuItem
              key={item.id}
              onClick={() => handleSelectCountry(item)}
              className={isSelected ? 'selected' : ''}
            >
              <ListItemIcon>
                <Image src={item.flag} width={31} height={21} />
              </ListItemIcon>
              <ListItemText primary={`${item.country} (+${item.code})`} />
              <Check className="checkIcon" />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </>
  );
}
