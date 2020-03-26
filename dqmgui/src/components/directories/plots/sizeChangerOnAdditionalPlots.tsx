import * as React from 'react';
import { connect } from 'react-redux'

import { sizes } from './sizes'
import SelectField from '../../../components/common/selectField'
import { setSizeOnAdditionalPlots, getAdditionalPlotsSize } from '../../ducks/plots/sizeChanger'
import { SizeProps } from 'src/app/interfaces'

interface SizeChangerProps {
  setSizeOnAdditionalPlots(size: SizeProps): void;
  settedSize: SizeProps,
}

const SizeChangerOnAdditionalPlots = ({ setSizeOnAdditionalPlots, settedSize }: SizeChangerProps) =>
  <SelectField
    default={JSON.stringify(settedSize)}
    component={SelectField}
    options={sizes}
    getOptionLabel={(option: any) => option.label}
    getOptionValue={(option: any) => JSON.stringify(option.size)}
    onChange={(e: any) => setSizeOnAdditionalPlots(JSON.parse(e.target.value))}
  />



export default connect(
  (state: any) => ({
    settedSize: getAdditionalPlotsSize(state)
  }),
  { setSizeOnAdditionalPlots }
)(SizeChangerOnAdditionalPlots)