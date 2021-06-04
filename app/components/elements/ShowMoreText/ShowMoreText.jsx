import ShowMoreText from 'react-show-more-text';

import styles from './ShowMoreText.module.scss';

const AppShowMoreText = ({
  children,
  lines = 3,
  more = 'Mostrar más',
  less = 'Mostrar menos',
}) => {
  return (
    <ShowMoreText
      anchorClass={styles.expand}
      lines={lines}
      more={more}
      less={less}
    >
      {children}
    </ShowMoreText>
  );
};

export default AppShowMoreText;
