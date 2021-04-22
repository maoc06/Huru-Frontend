import { useState } from 'react';

import CardSelectable from '../../elements/CardSelectable/CardSelectable';

import styles from './CardSelectableLayout.module.scss';

export default function CardSelectableLayout({
  list,
  propKey,
  propValue,
  propSelect,
  onSelect,
  selectFull = false,
  withIconEnum = false,
  iconEnum = {},
  initialSelected = [],
}) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);

  const handleClick = (index, value) => {
    let selected = [];

    if (selectedIndex.includes(index)) {
      selected = selectedIndex.filter((selected) => selected !== index);
      // setSelectedIndex(selected);
    } else {
      selected = [...selectedIndex, index];
      // setSelectedIndex([...selectedIndex, index]);
    }

    setSelectedIndex(selected);

    if (selectFull) {
      onSelect(selected);
    } else {
      onSelect(value);
    }
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
