import { useState } from 'react';

import CardSelectable from '../../elements/CardSelectable/CardSelectable';

import styles from './CardSelectableLayout.module.scss';

export default function CardSelectableLayout({
  list,
  propKey,
  propValue,
  propSelect,
  onSelect,
  withIconEnum = false,
  iconEnum = {},
}) {
  const [selectedIndex, setSelectedIndex] = useState([]);

  const handleClick = (index, value) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((selected) => selected !== index));
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }

    onSelect(value);
  };

  return (
    <div className={styles.layout}>
      {list.map((item) => {
        return (
          <div
            key={item[propKey]}
            onClick={() => handleClick(item[propKey], item[propSelect])}
          >
            <CardSelectable
              withIcon={withIconEnum}
              icon={withIconEnum ? iconEnum[item[propKey]] : iconEnum}
              title={item[propValue]}
              selected={selectedIndex.includes(item[propKey])}
            />
          </div>
        );
      })}
    </div>
  );
}
