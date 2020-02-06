import * as React from 'react'
import { Grid, Button } from '@material-ui/core'
import { compose } from 'ramda';
import { connect } from 'react-redux'

import { setMenuContent } from '../ducks/sideNav/setMenuStatus'
import { SERVICES, WORKPLACES, RUN } from '../../components/constants'

interface RunsProps {
  setMenuContent(type: string): void;
}

const NotSetted = ({ setMenuContent, ...props }: RunsProps) => {
  const options = [SERVICES, WORKPLACES, RUN ]

  return (
    <Grid item container spacing={8}>
      {options.map((option: any) =>
        <Grid item>
          <Button variant="outlined" key={option} color="primary" onClick={() => setMenuContent(option)} >
            {option}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      setMenuContent(type: string) {
        dispatch(setMenuContent(type))
      }
    })
  )
)(NotSetted)