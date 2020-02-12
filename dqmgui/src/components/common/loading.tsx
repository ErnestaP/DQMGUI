import * as React from 'react'
import { CircularProgress, Dialog, DialogContent, } from '@material-ui/core'

interface LoaderProps {
    isFetching: boolean
}

const Loader = ({ isFetching, ...props }: LoaderProps) => {
    return (
        <Dialog open={isFetching}>
            <DialogContent>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    )
}
export default Loader
