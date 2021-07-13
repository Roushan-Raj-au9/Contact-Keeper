import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertReducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT:
          return [...state, action.payload];

        case REMOVE_ALERT:
            return state.filter( (item) => item.id !== action.payload)

        default:
          return state;
    }
}

export default AlertReducer;
