import * as React from 'React'
import { connect } from 'react-redux'

import { sizes } from './sizes'
import SelectField from '../../../components/common/selectField'
import { Field } from 'react-final-form'
import { setSize, getSize } from '../../ducks/header/sizeChanger'
import { SizeProps } from 'src/app/interfaces'

interface SizeChangerProps {
  setSize(size: SizeProps): void;
  settedSize: SizeProps,
}

const SizeChanger = ({ setSize, settedSize }: SizeChangerProps) =>
  <SelectField
    default={JSON.stringify(settedSize)}
    component={SelectField}
    options={sizes}
    getOptionLabel={(option: any) => option.label}
    getOptionValue={(option: any) => JSON.stringify(option.size)}
    onChange={(e: any) => setSize(JSON.parse(e.target.value))}
  />



export default connect(
  (state: any) => ({
    settedSize: getSize(state)
  }),
  { setSize }
)(SizeChanger)