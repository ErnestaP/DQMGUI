import React from 'react'

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
    <div>
      {value}
    </div>
  )