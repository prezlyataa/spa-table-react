import {
    GET_ALL_EMPLOYEES,
    CREATE_EMPLOYEE,
} from '../constants/actionTypes';

const initialState = {
    employees: [],
};

const employees = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        default:
            return state;
    }
};

export default employees;