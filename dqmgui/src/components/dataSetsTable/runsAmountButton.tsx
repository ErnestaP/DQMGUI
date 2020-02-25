import * as React from 'react'
import { connect } from "react-redux"

import { setSelectedDataset } from "../ducks/table/selectedData"

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