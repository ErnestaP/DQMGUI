import * as React from 'react';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';

interface TimeProps{
  classes: any;
}

export class Time extends React.Component<TimeProps> {
  state = ({
    time: moment.utc().format('MMMM Do YYYY, HH:mm:ss')
  })

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: moment.utc().format('MMMM Do YYYY, HH:mm:ss')
    });
  }

  render() {
    const {classes} = this.props
    return (
      <Typography className={classes}>
        {this.state.time}
      </Typography>
    );
  }
}