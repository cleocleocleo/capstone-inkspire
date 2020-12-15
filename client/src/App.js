import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Splash from './pages/Splash';
import Profile from './pages/Profile';
import Search from './pages/Search';
import User from './pages/User';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (authenticated === true)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: {from: props.location} }} />}
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

    useEffect( () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setAuthenticated(true);
                setIsLoading(false);
            } else {
                setAuthenticated(false);
                setIsLoading(false);
            }
        });
    }, []);

    return isloading === true ? <h2>Loading...</h2> : (
        <BrowserRouter>
            <Nav />
                <Switch>
                    <PrivateRoute exact path="/" authenticated={authenticated} component={Splash}></PrivateRoute>
                    <PublicRoute path="/signup" authenticated={authenticated} component={Splash}></PublicRoute>
                    <PublicRoute path="/login" authenticated={authenticated} component={Splash}></PublicRoute>
                    <main>
                        <PrivateRoute exact path="/profile" authenticated={authenticated} component={Profile}></PrivateRoute>
                        <PrivateRoute path="/search" authenticated={authenticated} component={Search}></PrivateRoute>
                        <PrivateRoute exact path="/user/:username" authenticated={authenticated} component={User}></PrivateRoute>
                        <PrivateRoute exact path="/profile/:gallery" authenticated={authenticated} component={Gallery}></PrivateRoute>
                        <PrivateRoute path="/user/:username/:gallery" authenticated={authenticated} component={Gallery}></PrivateRoute>
                    </main>
                </Switch>
            <Footer />
        </BrowserRouter>
    );
};

export default App;