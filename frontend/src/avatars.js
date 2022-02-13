// CREDIT: Material-UI Avatars
// https://material-ui.com/components/avatars/
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import globalContext from './globalContext';

const useStyles = makeStyles((theme) => ({
  root: {
    'display': 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));
/**
 * @return {*}
 */
export default function Avatars() {
  const classes = useStyles();
  // Global Context
  const {userName} = React.useContext(globalContext);

  return (
    <div className={classes.root}>
      <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
    </div>
  );
}
