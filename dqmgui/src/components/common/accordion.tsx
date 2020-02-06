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
    padding: '0px !important',
    width: '100% !important'
  },
  subsection: {
    borderBottom: '1px solid'
  },
  title: {
    transition: '0.8s',
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.common.white,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    paddingLeft: '8px',
    paddingTop: '8px',
  },
  clicked: {
    fontWeight: 'bold',
  },
  subtitle: {
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    paddingLeft: '16px',
  },
  wrapper:{
    padding: '0px !important',
    width: '100% !important'
   }
})

class AccordionComponent extends React.Component<AccordionComponent>{

  state = ({
    expanded: null,
    subtitleClicked: null,
  })

  expand = (expandedName: string) => {
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

  setPannel = (subtitle: string) => {
    if (this.state.subtitleClicked !== subtitle) {
      this.setState({
        subtitleClicked: subtitle,
      })
    }
    else {
      this.setState({
        subtitleClicked: null,
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
            const clicked = pannelsName === this.state.expanded;

            return (
              <Grid container item direction="column"
                className={`${classes.accordion} ${classes.expanded}`}
                key={pannelsName}
                onClick={() => this.expand(pannelsName)}
              >
                <Grid item className={`${classes.title}`}>
                  <Typography variant="subtitle1" className={`${clicked && classes.clicked}`}>{pannelsName}</Typography>
                </Grid>
                {pannelsName === this.state.expanded &&
                  <Grid item container direction="column" className={classes.subsection}>
                    {subSections.map((name: string) => {
                      const clickedSubtitle = this.state.subtitleClicked == name

                      return (
                        <Grid item
                          key={name}
                          onClick={() => { this.expand(pannelsName); this.setPannel(name) }}
                        >
                          <Typography variant="subtitle2" className={`${classes.subtitle} ${clickedSubtitle && classes.clicked}`}>
                            {name}
                          </Typography>
                        </Grid>)
                    })}
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