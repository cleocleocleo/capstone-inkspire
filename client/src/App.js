import { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: 'login', state: {from: props.location } }} />}
        />
    )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
            ? <Component {...props} />
            : <Redirect to='/' />}
        />
    )
}

class App extends Component {
    state = {
        authenticated: false,
        loading: true
    };

    componentDidMount() {
        this.removelistener = auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false
                });
            }
        })
    }

    render() {
        return this.state.loading === true ? <h2>Loading...</h2> : (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/" authenticated={this.state.authenticated} component={Home}></PrivateRoute>
                    <PrivateRoute path="/profile" authenticated={this.state.authenticated} component={Profile}></PrivateRoute>
                    <PublicRoute path="/signup" authenticated={this.state.authenticated} component={SignUp}></PublicRoute>
                    <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;