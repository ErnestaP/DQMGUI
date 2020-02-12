import * as React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Button } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { setDialogState } from '../ducks/dialog/openClose'

interface DialogProps {
  input?: any;
  header?: string;
  conntentText?: string;
  open: boolean;
  close?(): void;
  runsList?: string[];
  toggleDialog(close: boolean): void;
}

const CommonDialog = ({ input, toggleDialog, runsList, header, conntentText, open, close, ...props }: DialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Runs</DialogTitle>
      <DialogContent>
        <Grid container >
          {runsList.map((run: string) =>
            <Grid item xs={12} key={run} onClick={() => input.onChange(run)}>
              {run}
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default compose(
  connect(
    undefined,
    (dispatch: any) => ({
      toggleDialog(isOpen: boolean) {
        dispatch(setDialogState(isOpen))
      }
    })
  )
)(CommonDialog)