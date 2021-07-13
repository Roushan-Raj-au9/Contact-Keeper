import { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types';


const ContactState = (props) => {
    const initialState ={
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    //get Contacts
    const GetContactsAction = async () => {
        try {
            const { data } = await axios.get('/api/contact');

            dispatch({
                type: GET_CONTACTS,
                payload: data 
            })
            
        } 
        catch (err) {
            const error = err.response && err.response.data.message ? err.response.data.message : err.message
    
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error
            })
        }
    }

    //Add Contact
    const AddContactAction = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/contact/add', contact, config)

            dispatch({
                type: ADD_CONTACT,
                payload: data 
            })
        } 
        catch (err) {
            const error = err.response && err.response.data.message ? err.response.data.message : err.message
    
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error
            })
        }

    }

    //Delete Contact 
    const DeleteContactAction = async (id) => {
        try {
            await axios.delete(`/api/contact/${id}`)

            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } 
        catch (err) {
            const error = err.response && err.response.data.message ? err.response.data.message : err.message
    
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error
            })
        }

    }

     //Update Contact
    const UpdateContactAction = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.put(`/api/contact/${contact._id}`, contact, config)

            dispatch({
                type: UPDATE_CONTACT,
                payload: data 
            })
        } 
        catch (err) {
            const error = err.response && err.response.data.message ? err.response.data.message : err.message
    
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error
            })
        }
    }

    //Set Current Contact
    const SetCurrentAction = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    //Clear Current Contact
    const ClearCurrentAction = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    //Filter Contacts
    const FilterContactAction = (text) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //Clear Filter
    const ClearFilterAction = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    //Clear Contacts
    const ClearContactsAction = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    }

    return(
        <ContactContext.Provider
         value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            GetContactsAction,
            AddContactAction,
            DeleteContactAction,
            SetCurrentAction,
            ClearCurrentAction,
            UpdateContactAction,
            FilterContactAction,
            ClearFilterAction,
            ClearContactsAction
         }}
        >
            { props.children }
        </ContactContext.Provider>
    )
}


export default ContactState;

