import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


const App = () => {
    return (<div>
        TEST1s
    </div>)
}


ReactDOM.render(<App />, document.getElementById('root'));
