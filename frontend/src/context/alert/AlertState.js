import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';


const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    //Set Alert
    const SetAlertAction = (msg, type, timeout = 5000) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }

    return(
        <AlertContext.Provider
         value={{
            alerts: state,
            SetAlertAction
         }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;