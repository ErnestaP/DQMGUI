import * as React from 'react';
import { InputLabel, FormControl, FormHelperText, Select } from '@material-ui/core';
import { path, pathOr } from 'ramda';

interface SelectFieldProps {
  options: any[];
  getOptionValue: any;
  getOptionLabel: any;
  label: string;
  onChange: any;
  input: any;
  meta: {
    error: string
  };
}


const SelectField = ({ label, input, onChange, options, getOptionLabel, getOptionValue, dropdownStyle, selectClass, formControlClass, inputFieldClass, ...props }: SelectFieldProps) => {

  return (
    <FormControl variant="outlined"
      className={formControlClass}
    >
      <InputLabel className={inputFieldClass}>
        {label}
      </InputLabel>
      <Select
        defaultValue={path(['default'], props)}
        native
        variant="standard"
        onChange={onChange ?
          onChange
          :
          (event: React.ChangeEvent<HTMLInputElement>) => input.onChange(event.target.value)}
        inputProps={{
          name: 'selectField',
          id: 'select-field-for-active-tabs',
          className: inputFieldClass,
        }}
        MenuProps={{
          classes: {
            paper: dropdownStyle
          }
        }}
      >
        {options.map((option: any) => (
          <option key={getOptionValue(option)} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </Select>
      {pathOr('', ['meta', 'error'], props) &&
        <FormHelperText>{props.meta.error}</FormHelperText>
      }
    </FormControl>
  )
}

export default SelectField