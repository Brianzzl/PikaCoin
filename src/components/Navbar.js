import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import pikachu from "../assets/icon1.png";
import Jdenticon from "react-jdenticon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ account }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ background: "#89aaff" }}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='grey'
            aria-label='menu'>
            <img src={pikachu} alt='a Giant Pikachu' width='48' />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Pikachu Coinbase
          </Typography>
          <Button color='inherit'>
            <Jdenticon size='40' value={account} />
          </Button>

          <Typography>{account}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
