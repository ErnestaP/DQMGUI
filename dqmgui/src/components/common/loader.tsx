import * as React from 'react'
import { CircularProgress, Dialog, DialogContent, withStyles, } from '@material-ui/core'

interface LoaderProps {
  isFetching: boolean;
  classes: any;
}

const styles = () => ({
  spinnerPaperRoot: {
    background: 'transparent',
    boxShadow: 'none'
  }
})

const Loader = ({ isFetching, classes, ...props }: LoaderProps) => {
  console.log(isFetching)
  return (
    <Dialog open={isFetching}
      PaperProps={{
        classes: {
          root: classes.spinnerPaperRoot,
        },
      }}
    >
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  )
}
export default withStyles(styles)(Loader)
