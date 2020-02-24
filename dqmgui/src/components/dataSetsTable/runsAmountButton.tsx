import * as React from 'react'
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"

import { setSelectedDataset } from "../ducks/table/selectedDataset"
import { setDataset } from "../ducks/header/setPaths"

interface RunsAmountButtonProps {
  setSelectedDataset(name: string): void;
  runsAmount: string;
  name: string;
  index: string;
}

const RunsAmountButton = ({ runsAmount, setSelectedDataset, name, index }: RunsAmountButtonProps) => {
  return (
    <div className="runButton"
      onClick={(e) => {
        setSelectedDataset(name)
      }}
    >
      {runsAmount}
    </div>
  )
}

export default connect(
  undefined,
  (dispatch: any) => ({
    setSelectedDataset(dataset: string) {
      dispatch(setSelectedDataset(dataset))
      // dispatch(setDataset(dataset))
    },
  })
)(RunsAmountButton)