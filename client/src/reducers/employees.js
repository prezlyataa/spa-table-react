import {
    GET_ALL_EMPLOYEES,
    GET_CURRENT_EMPLOYEE,
    RESET_CURRENT_EMPLOYEE,
    SEARCH_EMPLOYEES
} from '../constants/actionTypes';

const initialState = {
    employees: [],
    currentEmployee: null,
};

const employees = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        case GET_CURRENT_EMPLOYEE:
            return {
                ...state,
                currentEmployee: action.payload
            };  
        case RESET_CURRENT_EMPLOYEE:
            return {
                ...state,
                currentEmployee: null
            };  
        case SEARCH_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        default:
            return state;
    }
};

export default employees;