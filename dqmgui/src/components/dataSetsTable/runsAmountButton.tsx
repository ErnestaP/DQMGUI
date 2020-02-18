import * as React from 'react'

import  Button  from "@material-ui/core/Button"
import { pathOr } from "ramda"
import { connect } from "react-redux"
import { compose } from "redux"

import { setSelectedDataSet } from "../ducks/table/selectedDataSet"
import { setDataSet } from "../ducks/header/setPaths"


const RunsAmountButton = (props) => {
  return (
    <Button variant="outlined"
      // className={classes.buttons}
      onClick={() => {
        props.setSelectedDataSet(props.name)
      }}>
      {props.runs}
    </Button>
  )
}

export default connect(
    undefined,
    (dispatch: any) => ({
      setSelectedDataSet(dataSet: string) {
        dispatch(setSelectedDataSet(dataSet))
        dispatch(setDataSet(dataSet))
      },
    })
  )(RunsAmountButton)