import Link from 'next/link';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { materialListStyles } from '../../../styles/material/lists';

export default function AppListItem({
  text,
  icon,
  href = '/',
  isLink = true,
  onSelectNotLink = () => {},
}) {
  const classes = materialListStyles();

  if (!isLink) {
    return (
      <ListItem button classes={{ root: classes.root }}>
        <ListItemText primary={text} />

        <ListItemIcon
          classes={{ root: classes.icon }}
          onClick={onSelectNotLink}
        >
          {icon}
        </ListItemIcon>
      </ListItem>
    );
  }

  return (
    <Link href={href}>
      <a>
        <ListItem button classes={{ root: classes.root }}>
          <ListItemText primary={text} />

          <ListItemIcon classes={{ root: classes.icon }}>{icon}</ListItemIcon>
        </ListItem>
      </a>
    </Link>
    // <div onClick={onSelect}>

    // </div>
  );
}
