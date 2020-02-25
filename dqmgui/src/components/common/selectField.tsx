import * as React from 'React';
import { InputLabel, FormControl, FormHelperText, Select } from '@material-ui/core';

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


const SelectField = ({ label, input, meta, options, getOptionLabel, getOptionValue,dropdownStyle,  selectClass, formControlClass, inputFieldClass }: SelectFieldProps) => {

  return (
    <FormControl variant="outlined" 
    className={formControlClass}
    >
      <InputLabel className={inputFieldClass}>
        {label}
      </InputLabel>
      <Select
        native
        variant="outlined"
        value={input.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => input.onChange(event.target.value)}
        inputProps={{
          name: 'selectField',
          id: 'select-field-for-active-tabs',
          className: inputFieldClass,
        }}
        MenuProps={{ classes: { paper: dropdownStyle } }}
        classes={{
          // root: inputFieldClass,
          // filled: inputFieldClass,
          // icon: inputFieldClass,
          // outlined: inputFieldClass,
          // selectMenu: selectClass
        }}
      >
        {options.map((option: any) => (
          <option key={getOptionValue(option)} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </Select>
      {meta.error &&
        <FormHelperText>{meta.error}</FormHelperText>
      }
    </FormControl>
  )
}

export default SelectField