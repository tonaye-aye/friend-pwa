import React from "react";

// material components
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// icons
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ListIcon from "@material-ui/icons/List";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

// custom Material UI styles
const useStyles = makeStyles({
  topbar: {
    margin: "0 0 2rem 0",
    borderBottom: "1px solid silver"
  }
});

export default function Nav({ value, setStatus, setValue }) {
  //custom styles
  const classes = useStyles();

  // return template JSX
  return (
    <BottomNavigation
      className={classes.topbar}
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
        setStatus(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction value="all" label="All" icon={<ListIcon />} />
      <BottomNavigationAction
        value="completed"
        label="Completed"
        icon={<DoneAllIcon />}
      />
      <BottomNavigationAction
        value="incomplete"
        label="Incomplete"
        icon={<NotInterestedIcon />}
      />
    </BottomNavigation>
  );
}
