import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

export default class SignUp extends Component {
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
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        return (
            <div className="signup">
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <label>
                        <h3 className="signup__form-label">Email</h3>
                        <input type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
                    </label>
                    <label>
                        <h3 className="signup__form-label">Password</h3>
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                    </label>
                    {this.state.error ? <p className="signup__error-text">{this.state.error}</p> : null}
                    <button className="signup__button">Sign up</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        );
    }
}
