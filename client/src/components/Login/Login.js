import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../../helpers/auth';
import { useForm } from "react-hook-form";
import { ReactComponent as EyeIcon } from '../../assets/icons/watch2.svg';

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
        <form className="splash__form" onSubmit={handleSubmit(onSubmit)}>
            <EyeIcon className="splash__icon" />
            <h1 className="splash__form-header">Log In</h1>
            <label>
                <h3 className="splash__form-label">Email: </h3>
                <input
                    className="splash__form-field"
                    type="text"
                    name="email"
                    ref={register({
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                />
            </label>
            <label>
                <h3 className="splash__form-label">Password: </h3>
                <input
                    className="splash__form-field"
                    type="password"
                    name="password"
                    ref={register({ required: "Password is required!" })}
                />
                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </label>
            {error ? <p className="splash__error">{error}</p> : null}
            <button className="splash__btn" type="submit">Log In</button>
            <p>Don't have an account? <Link to="/signup" className="splash__link">Sign up here</Link></p>
        </form>
    );
}


export default Login;