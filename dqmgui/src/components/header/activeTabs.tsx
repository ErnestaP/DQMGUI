import * as React from 'react'
import { Grid, withStyles } from '@material-ui/core'

import { pseudoRuns, workSpaces, pseudoServices } from '../pseudoFields'
import ActiveTabsSwitching from '../common/activeTabsComponent'
import { Field } from 'react-final-form'

interface ActiveTabsProps {
  services: string[]
  workspaces: string[];
  lumisections: string[];
  runs: string[];
  classes: {
    selectField: string;
    inputField: string;
  }
}

const styles = (theme: any) => ({
  selectField: {
    // background: 'transparent',
    borderRadius: 15,
  },
  inputField: {
    // color: theme.palette.common.white,
    background: theme.palette.primary.light,

  },
  select: {
    background: theme.palette.primary.light,
    color: 'black'
  },
  dropdownStyle: {
    border: "1px solid black",
    borderRadius: "5%",
    backgroundColor: 'lightgrey',
  },
})

const dropdownMenuProps = {
  menuStyle: {
    border: "1px solid black",
    borderRadius: "5%",
    backgroundColor: 'lightgrey',
  },
}
const ActiveTabs = ({ services, workspaces, lumisections, runs, classes }: ActiveTabsProps) => {
  return (
    <Grid item container>
      {/* <Grid item>
        <Field
          name="servicesSelectField"
          component={SelectField}
          label="Services"
          options={Object.values(pseudoServices)}
          getOptionValue={(option: string) => option.title}
          getOptionLabel={(option: string) => option.title}
          formControlClass={classes.selectField}
          inputFieldClass={classes.inputField}
          selectClass={classes.select}
          dropdownStyle={classes.dropdownStyle}

        />
      </Grid>
      <Grid item>
        <Field
          name="workspacesSelectField"
          component={SelectField}
          label="Workspaces"
          options={Object.keys(workSpaces)}
          getOptionValue={(option: string) => option}
          getOptionLabel={(option: string) => option}
          formControlClass={classes.selectField}
          inputFieldClass={classes.inputField}
          selectClass={classes.select}
          dropdownStyle={classes.dropdownStyle}

        />
      </Grid> */}
      <Grid item>
        <Field
          name="workspacesSelectField"
          component={ActiveTabsSwitching}
          label="Runs"
          options={Object.keys(pseudoRuns)}
          // getOptionValue={(option: string) => option}
          // getOptionLabel={(option: string) => option}
          formControlClass={classes.selectField}
          inputFieldClass={classes.inputField}
          selectClass={classes.select}
          dropdownStyle={classes.dropdownStyle}
        />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ActiveTabs)
