import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types';


const ContactReducer = (state, action) => {
    switch(action.type){
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            }

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map( (item) => item._id === action.payload._id ? action.payload : item),
                loading: false
            }
 
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter( (item) => item._id !== action.payload),
                loading: false
            }

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter( (item) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return item.name.match(regex) || item.email.match(regex);
                })
            }

        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }

        case CONTACT_ERROR:
            return {
                error: action.payload
            }

        default:
            return state
    }
}

export default ContactReducer;