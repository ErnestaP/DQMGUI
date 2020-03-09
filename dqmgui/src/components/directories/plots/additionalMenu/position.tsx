import * as React from 'React'
import { connect } from 'react-redux'

import { postions } from './constants'
import SelectField from '../../../../components/common/selectField'
import { setPosition, getPosition } from '../../../ducks/plots/reference'

interface SizeChangerProps {
  setPosition(position: string): void;
  settedPosition: string,
}

const PositionsSelectField = ({ settedPosition, setPosition }: SizeChangerProps) =>
  <SelectField
    default={settedPosition}
    component={SelectField}
    options={postions}
    getOptionLabel={(option: any) => option}
    getOptionValue={(option: any) => option}
    onChange={(e: any) => setPosition(e.target.value)}
  />



export default connect(
  (state: any) => ({
    settedPosition: getPosition(state)
  }),
  { setPosition }
)(PositionsSelectField)