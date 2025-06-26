import { useState } from 'react';

import CardSelectable from '../../modules/CardSelectable/CardSelectable';

import styles from './CardSelectableLayout.module.scss';

export default function CardSelectableLayout({
  list,
  propKey,
  propValue,
  propValueNested,
  propSelect,
  onSelect,
  selectFull = false,
  withIconEnum = false,
  iconEnum = {},
  initialSelected = [],
  valueNested = false,
  selectables = true,
  isAllActives = false,
  cardSizes = 'small',
  ...otherProps
}) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);

  const handleClick = (index, value) => {
    let selected = [];

    if (selectedIndex && selectedIndex.includes(index)) {
      selected = selectedIndex.filter((selected) => selected !== index);
      // setSelectedIndex(selected);
    } else {
      selected = [...(selectedIndex || []), index];
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
    <div
      className={`${styles.layout} ${cardSizes === 'small' && styles.small} ${
        cardSizes === 'large' && styles.large
      }`}
    >
      {list.map((item) => {
        return (
          <div
            key={item[propKey]}
            onClick={
              selectables
                ? () => handleClick(item[propKey], item[propSelect])
                : () => {}
            }
          >
            <CardSelectable
              withIcon={withIconEnum}
              icon={withIconEnum ? iconEnum[item[propKey]] : iconEnum}
              title={
                valueNested ? item[propValue][propValueNested] : item[propValue]
              }
              selected={
                isAllActives ? true : selectedIndex && selectedIndex.includes(item[propKey])
              }
              {...otherProps}
            />
          </div>
        );
      })}
    </div>
  );
}
