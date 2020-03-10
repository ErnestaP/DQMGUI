import React from 'react'
import { FormControl, Input, FormHelperText } from "@material-ui/core";
import { pathOr } from 'ramda';

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
        value={input.value} />
      {meta.error && meta.visited &&
        <FormHelperText error>{meta.error}</FormHelperText>
      }
    </FormControl>
  )
}
export default TexField