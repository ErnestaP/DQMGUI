import React from 'react'
import { FormControl, Input, InputLabel, FormHelperText } from "@material-ui/core";
import { pathOr } from 'ramda';

const TexField = ({ input, meta, onChange, ...props }: any) => {
  return (
    <FormControl>
      <Input
        fullWidth
        placeholder={pathOr('', ['placeholder'], props)}
        onChange={(e) => input.onChange(e.target.value)}
        value={input.value} />
      {meta.error &&
        <FormHelperText>{meta.error}</FormHelperText>
      }
    </FormControl>
  )
}
export default TexField