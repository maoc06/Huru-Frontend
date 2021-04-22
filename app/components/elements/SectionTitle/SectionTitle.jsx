import { useState } from 'react';

import { InfoOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './SectionTitle.module.scss';

const SectionTitle = ({ title, showInfoTip = false, toolTip = '' }) => {
  const [openToolTip, setOpenToolTip] = useState(false);

  const handleTooltipClose = () => {
    setOpenToolTip(false);
  };

  const handleTooltipOpen = () => {
    setOpenToolTip(true);
  };

  return (
    <div className={styles.container}>
      <h5>{title}</h5>

      {showInfoTip && (
        <Tooltip
          arrow
          title={toolTip}
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={openToolTip}
        >
          <IconButton aria-label="info" onClick={handleTooltipOpen}>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default SectionTitle;
