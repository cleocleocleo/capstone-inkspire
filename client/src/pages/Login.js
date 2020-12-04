import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../helpers/auth';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          error: null,
          email: '',
          password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        try {
            await signin(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <h1>Log In</h1>
                    <label>
                        <h3 className="login__form-label">Email</h3>
                        <input type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
                    </label>
                    <label>
                        <h3 className="login__form-label">Password</h3>
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    </label>
                    {this.state.error ? <p className="login__error-text">{this.state.error}</p> : null}
                    <button className="login__button">Log In</button>
                    <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
                </form>
            </div>
        );
    }
}