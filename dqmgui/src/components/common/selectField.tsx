import * as React from 'React';
import NativeSelect from '@material-ui/core/NativeSelect';
import { InputLabel, FormControl, FormHelperText } from '@material-ui/core';

interface SelectFieldProps {
  options: any[];
  getOptionValue: any;
  getOptionLabel: any;
  label: string;
  onChange: any;
  input: any;
  error: any;
}

const SelectField = ({ label, onChange, input, error, options, getOptionLabel, getOptionValue, ...props }: SelectFieldProps) => {
  const optionValues = Object.values(options)
  console.log(input)
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <NativeSelect
        inputProps={{
          name: 'selectField',
        }}
        onChange={input.onChange(input.value)}
      >
        {optionValues.map((option: any) => (
          <option key={option} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </NativeSelect>
      {error &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl>
  )
}

export default SelectField