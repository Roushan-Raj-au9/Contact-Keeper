import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const Login = (props) => {

    const authContext = useContext(AuthContext)
    const { LoginAction, error, ClearErrorAction, isAuthenticated } = authContext

    const alertContext = useContext(AlertContext) 
    const { SetAlertAction } = alertContext

    useEffect( () => {

        if(isAuthenticated){
            props.history.push('/')
        }

        if(error === 'Invalid Credentials'){
            SetAlertAction(error, 'danger')
            ClearErrorAction()
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])


    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const { email, password } = user

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(email === '' || password === ''){
            SetAlertAction('Please enter all fields', 'danger')
        }
        else{
            LoginAction({
                email,
                password
            })
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={changeHandler}
                        required
                        minLength='3'
                    />
                </div>
                <input
                    type='submit'
                    value='Login'
                    className='btn btn-primary btn-block'
                />
            </form>
        </div>
    )
}

export default Login;

