import React from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import home from '../../components/dataSetsTable'


export default () => (
    <Switch>
        {home}
    </Switch>
)