import * as React from 'react'
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"

import { setSelectedDataset } from "../ducks/table/selectedDataset"
import { setDataset } from "../ducks/header/setPaths"

interface RunsAmountButtonProps {
  setSelectedDataset(name: string): void;
  runs: string;
  name: string;
}

const RunsAmountButton = ({ runs, setSelectedDataset, name }: RunsAmountButtonProps) => {
  return (
    <Button variant="outlined"
      onClick={() => {
        setSelectedDataset(name)
      }}>
      {runs}
    </Button>
  )
}

export default connect(
  undefined,
  (dispatch: any) => ({
    setSelectedDataset(dataset: string) {
      dispatch(setSelectedDataset(dataset))
      dispatch(setDataset(dataset))
    },
  })
)(RunsAmountButton)