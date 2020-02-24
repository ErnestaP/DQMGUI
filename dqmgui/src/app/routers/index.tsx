import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '../../components/dataSetsTable'
import Directories from "../../components/directories";
import { connect } from "react-redux";
import { getSelectedPathForApi } from "../../components/ducks/header/setPaths";

const AppRouter = (props) =>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path={`${props.pathOfDirectories}`}>
          <Directories />
        </Route>
      </Switch>
    </Router>

export default connect(
  (state: any) =>({
    pathOfDirectories: getSelectedPathForApi(state)
  })
)(AppRouter)


