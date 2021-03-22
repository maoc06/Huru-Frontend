import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { materialListStyles } from '../../../styles/material/lists';

export default function AppListItem({ text, icon, onSelect }) {
  const classes = materialListStyles();

  return (
    <div onClick={onSelect}>
      <ListItem button classes={{ root: classes.root }}>
        <ListItemText primary={text} />

        <ListItemIcon classes={{ root: classes.icon }}>{icon}</ListItemIcon>
      </ListItem>
    </div>
  );
}
