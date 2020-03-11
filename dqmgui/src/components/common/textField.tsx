import React from 'react'
import { FormControl, Input, FormHelperText } from "@material-ui/core";
import { pathOr, path } from 'ramda';

const chooseOnChange = (onChange: any, input: any) => onChange ? onChange : input.onChange

const TexField = ({ input, meta, onChange, ...props }: any) => {
  const onChangeMethod = chooseOnChange(onChange, input)

  return (
    <FormControl >
      <Input
        fullWidth={true}
        {...input}
        placeholder={pathOr('', ['placeholder'], props)}
        onChange={(e) => onChangeMethod(e.target.value)}
        value={path(['input', 'value'], props)} />
      {path(['error', 'meta'], props) && path(['error', 'visited'], props) &&
        <FormHelperText error>{path(['error', 'meta'], props)}</FormHelperText>
      }
    </FormControl>
  )
}
export default TexField