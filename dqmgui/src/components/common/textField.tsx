import React from 'react'
import { FormControl, Input, InputLabel, FormHelperText } from "@material-ui/core";
import { pathOr } from 'ramda';

const TexField = ({ input, meta, onChange, ...props }: any) => {
  console.log(meta.touched)
  return (
    <FormControl>
      <Input
        {...input}
        fullWidth
        placeholder={pathOr('', ['placeholder'], props)}
        onChange={(e) => input.onChange(e.target.value)}
        value={input.value} />
      {meta.error && meta.touched &&
        <FormHelperText error>{meta.error}</FormHelperText>
      }
    </FormControl>
  )
}
export default TexField