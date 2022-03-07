import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ClientEdit from "./ClientEdit";
import ClientList from "./ClientList";

class App extends Component {


    render() {

        return (
            <Router>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                {/*<Route path='/clients' exact={true} component={ClientList}/>*/}
                {/*<Route path='/clients/:id' component={ClientEdit}/>*/}
            </Switch>

        </Router>
        )
    }
}

export default App;