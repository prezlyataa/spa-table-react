import {
    GET_ALL_EMPLOYEES,
    CREATE_EMPLOYEE
} from "../constants/actionTypes";
import * as EmployeesApi from "../api/employees";

export const getAllEmployees = () => async dispatch => {
    const response = await EmployeesApi.getAllEmployees();

    dispatch({
        type: GET_ALL_EMPLOYEES,
        payload: response
    });
};