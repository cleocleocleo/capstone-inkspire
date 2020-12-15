import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { signup } from '../../helpers/auth';

const SignUp = () => {
    const [error, setError] = useState('');
    const {
        register,
        errors,
        getValues,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {
        setError('');
        try {
            await signup(data.email, data.password);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign Up</h1>
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
            <label>
                <h3 className="signup__form-label">Confirm Password: </h3>
                <input
                    type="password"
                    name="passwordConfirmation"
                    ref={register({
                        required: "Please confirm password!",
                        validate: {
                            matchesPreviousPassword: value => {
                                const { password } = getValues();
                                return password === value || "Passwords should match!";
                            }
                        }
                    })}
                />
                {errors.passwordConfirmation && (
                    <p>{errors.passwordConfirmation.message}</p>
                )}
            </label>
            {error ? <p className="signup__error-text">{error}</p> : null}
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;