import * as React from 'react'
import { connect } from 'react-redux'
import { getSelectedDatasetRuns } from '../ducks/table/selectedDataset'

interface RenderRunsProps {
  runs: string[];
  name: string
}

const renderRuns = ({ runs, name }: RenderRunsProps) => {
  return <div id={name}>
    {Object.keys(runs).map(run => {
      return <p
        style={{
          color: 'white',
          background: 'grey',
          borderRadius: '15px',
          display: "flex",
          justifyContent: 'center'
        }} key={run}>{run}</p>
    })}
  </div>
}


export default connect(
  (state: any) => ({
    getSelectedDataset: getSelectedDatasetRuns(state)
  }),
  undefined,
)(renderRuns)
