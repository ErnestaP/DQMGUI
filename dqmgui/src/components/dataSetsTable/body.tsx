import * as React from 'react'
import { TableBody } from '@material-ui/core'

import { SampleDataInerface } from '../ducks/header/interfaces'
import RunsRow from './runsRow'

interface SearchResultTableProps {
  samplesGroup: SampleDataInerface[],
  index: number;
}

class SearchResultTableBody extends React.Component<SearchResultTableProps> {
  state={dataset_selected: null}
  selectDataset=(dataset_selected) => {
    this.setState({
      dataset_selected
    })
  }
  render(){
    const { samplesGroup, index } = this.props;
    return (
      <TableBody>
        {
          Object.keys(samplesGroup).map((name: string) => {
            return (
              <RunsRow key={name} samplesGroup={samplesGroup} name={name} selectDataset={this.selectDataset} dataset_selected={this.state.dataset_selected} />
            )
          }
          )
        }
      </TableBody >
    )
  }

}

export default SearchResultTableBody
