import React from 'react'
import { FormControl, Checkbox, FormHelperText, CheckboxProps } from "@material-ui/core";

const chooseOnChange = (onChange: any, input: any) => onChange ? onChange : input.onChange

const CheckBox = ({ input, meta, onChange, checkboxProps, ...props }: any) => {
  const onChangeMethod = chooseOnChange(onChange, input)
console.log(onChangeMethod)
  return (
    <FormControl >
      <Checkbox
        {...input}
        {...props}
        {...checkboxProps}
        onChange={onChangeMethod}
      // value={input.value} 
      />
      {meta.error && meta.visited &&
        <FormHelperText error>{meta.error}</FormHelperText>
      }
    </FormControl>
  )
}
export default CheckBox