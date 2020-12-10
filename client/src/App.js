import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Search from './pages/Search';
import Gallery from './components/Gallery/Gallery';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, userID, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (authenticated === true)
            ? <Component {...props} userID={userID} />
            : <Redirect to={{ pathname: 'login', state: {from: props.location} }} />}
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

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [userID, setUserID] = useState(null);

    useEffect( () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setAuthenticated(true);
                setIsLoading(false);
                setUserID(user.uid);
            } else {
                setAuthenticated(false);
                setIsLoading(false);
            }
        });
    }, []);

    return isloading === true ? <h2>Loading...</h2> : (
        <BrowserRouter>
            <Nav userID={userID} />
            <Switch>
                <PrivateRoute exact path="/" authenticated={authenticated} component={Home}></PrivateRoute>
                <PrivateRoute exact path="/profile" authenticated={authenticated} component={Profile}></PrivateRoute>
                <PrivateRoute path="/search" authenticated={authenticated} component={Search}></PrivateRoute>
                <PublicRoute path="/signup" authenticated={authenticated} component={SignUp}></PublicRoute>
                <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
                <PrivateRoute path="/profile/:gallery" authenticated={authenticated} component={Gallery}></PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default App;