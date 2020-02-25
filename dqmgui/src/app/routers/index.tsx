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
import history from './history'

const AppRouter = (props) => {
  const { path } = props.match;
  console.log(`${path}/${props.pathOfDirectories}`)
  return (
    <Router history={history}>
      <Switch>
        <Route
          key="home"
          exact 
          path={path}
          component={Home}
        />
        <Route
          key="directories"
          path={`${props.pathOfDirectories}`}
          component={Directories} />
      </Switch>
    </Router>
  )
}

export default withRouter(connect(
  (state: any) => ({
    pathOfDirectories: getSelectedPathForApi(state)
  })
)(AppRouter))


