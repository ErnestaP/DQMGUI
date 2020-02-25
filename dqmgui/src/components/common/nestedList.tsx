import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.black
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [summariesOpen, setSummariesOpen] = React.useState(false);
  const [triggerOpen, setTriggersOpen] = React.useState(false);
  const [trackerOpen, setTrackerOpen] = React.useState(false);
  const [calorimetersOpen, setCalorimetersOpen] = React.useState(false);
  const [CTTPSOpen, setCTTPSOpen] = React.useState(false);
  const [POGOpen, setPOGOpen] = React.useState(false);
  const [allOpen, setAllOpen] = React.useState(false);


  const handleClick = (openingFunction, open) => {
    openingFunction(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={() => handleClick(setAllOpen, allOpen)}>
        <ListItemText primary="Workspaces" />
        {allOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={allOpen} timeout="auto" unmountOnExit>

        <ListItem button onClick={() => handleClick(setSummariesOpen, summariesOpen)}>
          <ListItemText primary="Summaries" />
          {summariesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={summariesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="summ" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick(setTriggersOpen, triggerOpen)}>
          <ListItemText primary="Triggers" />
          {triggerOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={triggerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="trigg" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick(setCalorimetersOpen, calorimetersOpen)}>
          <ListItemText primary="Calorimeters" />
          {calorimetersOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={calorimetersOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="caloo" />
            </ListItem>
          </List>
        </Collapse>

      </Collapse>
    </List>

  );
}