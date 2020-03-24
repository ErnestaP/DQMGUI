import React from 'react'
import { FormControl, Input, FormHelperText } from "@material-ui/core";
import { pathOr, path } from 'ramda';

const chooseOnChange = (onChange: any, input: any) => onChange ? onChange : input.onChange

const TexField = ({ ...props }: any) => {
  const onChangeMethod = chooseOnChange(props.onChange, props.input)

  return (
    <FormControl>
      <Input
        {...props}
        name={props.name}
        fullWidth={true}
        placeholder={pathOr('', ['placeholder'], props)}
        onChange={(e) => {
        return (onChangeMethod(e.target.value))
        }}
      />
      {path(['error'], props) &&
        <FormHelperText error>{path(['error'], props)}</FormHelperText>
      }
    </FormControl>)
}
export default TexField