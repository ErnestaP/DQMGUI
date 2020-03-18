import React from 'react'
import { FormControl, Checkbox, FormHelperText, CheckboxProps } from "@material-ui/core";
import { path } from 'ramda';

const chooseOnChange = (onChange: any, input: any) => onChange ? onChange : input.onChange

const CheckBox = ({ input, meta, onChange, checkboxProps, ...props }: any) => {
  const onChangeMethod = chooseOnChange(onChange, input)

  return (
    <FormControl >
      <Checkbox
        {...input}
        {...props}
        {...checkboxProps}
        onChange={onChangeMethod}
      />
      {path(['error', 'meta'], props) && path(['error', 'visited'], props) &&
        <FormHelperText error>{path(['error', 'meta'], props)}</FormHelperText>
      }
    </FormControl>
  )
}
export default CheckBox