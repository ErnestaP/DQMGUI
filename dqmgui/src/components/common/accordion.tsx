import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
    background: theme.palette.secondary[400]
  },
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
              <ExpansionPanel
                className={`${classes.accordion} ${classes.expanded}`}
                key={pannelsName}
                onClick={() => this.setPannel(pannelsName)}
                expanded={pannelsName === this.state.expanded}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon style={{ width: '15px', height: '15px' }} />}
                >
                  <Typography style={{ fontSize: "0.825rem", opacity: 1 }}>
                    {pannelsName}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {
                    <Grid item container direction="column" >
                      {subSections.map((name: string) =>
                        <Grid item>
                          <Typography style={{ fontSize: "0.825rem" }}>
                            {name}
                          </Typography>
                        </Grid>)}
                    </Grid>
                  }
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AccordionComponent)