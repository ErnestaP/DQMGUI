import React from 'react'
import TextField from "@material-ui/core/TextField";

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    fullWidth={rest.fullWidth}
    onChange={(e) => onChange(e.target.value)}
  />
)