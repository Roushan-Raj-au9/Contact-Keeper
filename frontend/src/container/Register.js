import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const Register = (props) => {

    const alertContext = useContext(AlertContext)
    const { SetAlertAction } = alertContext

    const authContext = useContext(AuthContext)
    const { RegisterAction, error, ClearErrorAction, isAuthenticated } = authContext

    useEffect( () => {

        if(isAuthenticated){
            props.history.push('/')
        }

        if(error === 'User already exists'){
            SetAlertAction(error, 'danger')
            ClearErrorAction()
        }

        // eslint-disable-next-line 
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(name === '' || email === '' || password === ''){
            SetAlertAction('Please enter all fields', 'danger')
        }
        else if(password !== password2){
            SetAlertAction('Password do not match !', 'danger')
        }
        else{
            RegisterAction({
                name,
                email,
                password
            })
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type='text'
                        name='name'
                        value={name}
                        onChange={changeHandler}
                        required
                    />
                </div>
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
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                        id='password2'
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={changeHandler}
                        required
                        minLength='3'
                    />
                </div>
                <input
                    type='submit'
                    value='Register'
                    className='btn btn-primary btn-block'
                />
            </form>
        </div>
    )
}

export default Register;
