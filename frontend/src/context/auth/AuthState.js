import { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

import setAuthToken from '../../utils/setAuthToken'; 


const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //Load User
    const LoadUserAction = async () => {

        //load token into global headers
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        try {
            const { data } = await axios.get('/api/user/me')

            dispatch({
                type: USER_LOADED,
                payload: data
            })
        } 
        catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    //Register User
    const RegisterAction = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/auth/signup', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: data
            })

            LoadUserAction()
        } 
        catch (err) {
            const error = err.response && err.response.data.message ? err.response.data.message : err.message
    
            dispatch({ 
                type: REGISTER_FAIL,
                payload: error
            })
        }
    }

    //Login User
    const LoginAction = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/auth/signin', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })

            LoadUserAction()
        } 
        catch (err) {
            const error = err.response && err.response.data.message ? err.response.data.message : err.message
    
            dispatch({ 
                type: LOGIN_FAIL,
                payload: error
            })
        }
    }

    //Logout
    const LogoutAction = () => {
        dispatch({
            type: LOGOUT
        })
    }

    //Clear Errors
    const ClearErrorAction = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return(
        <AuthContext.Provider
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            RegisterAction,
            ClearErrorAction,
            LoadUserAction,
            LoginAction,
            LogoutAction
         }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;