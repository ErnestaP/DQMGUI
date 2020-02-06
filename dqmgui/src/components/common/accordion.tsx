import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, withStyles } from '@material-ui/core';
import { path } from 'ramda';

interface AccordionComponent {
  optionsAmount: number;
  pannels: any[],
  input: any;
  classes: any;
}

const styles = (theme: any) => ({
  accordion: {
    boxShadow: 'none',
  },
  expanded: {
    '&$expanded': {
      margin: '4px 0'
    },
  },
  subsection:{
    borderBottom: '1px solid'
  }
})

class AccordionComponent extends React.Component<AccordionComponent>{

  state = ({
    expanded: null,
  })

  setPannel = (expandedName: string) => {
    if (this.state.expanded !== expandedName) {
      this.setState({
        expanded: expandedName,
      })
    }
    else {
      this.setState({
        expanded: null,
      })
    }
  }

  render() {
    const { pannels, classes } = this.props
    const pannelsNames = Object.keys(pannels)

    return (
      <React.Fragment>
        {
          pannelsNames.map((pannelsName: string) => {
            const subSections = Object.values(path([pannelsName], pannels))

            return (
              <Grid container item direction="column"
                className={`${classes.accordion} ${classes.expanded}`}
                key={pannelsName}
                onClick={() => this.setPannel(pannelsName)}
              >
                <Grid item>
                  <Typography variant="subtitle1">{pannelsName}</Typography>
                </Grid>
                {pannelsName === this.state.expanded &&
                  <Grid item container direction="column" className={classes.subsection}>
                    {subSections.map((name: string) =>
                      <Grid item key={name}>
                        <Typography variant="subtitle2">
                          {name}
                        </Typography>
                      </Grid>)}
                  </Grid>
                }
              </Grid>
            )
          })
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AccordionComponent)