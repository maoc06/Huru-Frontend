import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './SimpleList.module.scss';

export default function AppSimpleList({
  list,
  propValue = 'id',
  propKey = 'id',
  selectedValue,
  onSelect,
}) {
  // Find the initial selected index based on selectedValue
  const getInitialSelectedIndex = () => {
    if (!selectedValue) return 0;
    const item = list.find(item => item[propValue] === selectedValue);
    return item ? item[propKey] : 0;
  };

  const [selectedIndex, setSelectedIndex] = useState(getInitialSelectedIndex);

  const handleListItemClick = (event, index, value) => {
    setSelectedIndex(index);
    onSelect(value);
  };

  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {list.map((item) => {
        return (
          <ListItem
            button
            key={item[propKey]}
            selected={selectedIndex === item[propKey]}
            onClick={(event) =>
              handleListItemClick(event, item[propKey], item[propValue])
            }
          >
            <ListItemText
              primary={item.name}
              className={`${styles.item_text} ${
                item[propKey] === 0 && styles.item_reset
              }`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
