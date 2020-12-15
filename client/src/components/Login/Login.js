import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../../helpers/auth';
import { useForm } from "react-hook-form";

const Login = () => {
    const[error, setError] = useState('');
    const {
        register,
        errors,
        handleSubmit
    } = useForm();
    
    const onSubmit = async (data) => {
        setError('');
        try {
            await signin(data.email, data.password);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Log In</h1>
            <label>
                <h3 className="signup__form-label">Email: </h3>
                <input
                    type="text"
                    name="email"
                    ref={register({
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                />
            </label>
            <label>
                <h3 className="signup__form-label">Set Password: </h3>
                <input
                    type="password"
                    name="password"
                    ref={register({ required: "Password is required!" })}
                />
                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </label>
            {error ? <p className="login__error-text">{error}</p> : null}
            <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
            <button type="submit">Log In</button>
        </form>
    );
}


export default Login;