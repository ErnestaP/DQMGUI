import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import Home from '../../components/dataSetsTable'
import Directories from "../../components/directories";
import { connect } from "react-redux";
import { getSelectedPathForApi } from "../../components/ducks/header/setPaths";
import NotFound from "../../../src/components/directories/notFound";

import history from './history'

const AppRouter = (props) => {
  const { path } = props.match;
  console.log(`${path}/${props.pathOfDirectories}`)
  return (
    <Switch>
      <Route
        key="home"
        exact={true}
        path={path}
        component={Home}
      />
      <Route
        key="directories"
        exact={true}
        path={`${props.pathOfDirectories}`}
        component={Directories} />
      <Route
        key="directories"
        exact={true}
        path={"*"}
        component={NotFound} />
    </Switch>
  )
}

export default withRouter(connect(
  (state: any) => ({
    pathOfDirectories: getSelectedPathForApi(state)
  })
)(AppRouter))


