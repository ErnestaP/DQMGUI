import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, withStyles, Icon, IconButton, Button, Typography } from '@material-ui/core'
import { compose, pathOr } from 'ramda';
import { connect } from 'react-redux'

import { setMenuContent } from '../ducks/sideNav/setMenuStatus'

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
  wrapper: {
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
    const { pannels, classes, setMenuContent } = this.props
    const pannelsNames = Object.keys(pannels)

    return (
      <Grid item container>
        <Grid item>
          <IconButton onClick={() => setMenuContent('')}>
            <Icon>
              <ArrowBackIcon color="primary" />
            </Icon>
          </IconButton>
        </Grid>
        {
          pannelsNames.map((pannelsName: string) => {
            const subSections = Object.values(pathOr([], [pannelsName], pannels))
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
      </Grid>
    );
  }
}

export default compose<any, any, any>(
  connect(
    undefined,
    (dispatch: any) => ({
      setMenuContent(type: string) {
        dispatch(setMenuContent(type))
      }
    })
  ),
  withStyles(styles)
)(AccordionComponent)