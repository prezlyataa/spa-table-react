import {
    GET_ALL_EMPLOYEES,
    GET_CURRENT_EMPLOYEE,
} from "../constants/actionTypes";
import * as EmployeesApi from "../api/employees";

export const getAllEmployees = () => async dispatch => {
    const response = await EmployeesApi.getAllEmployees();

    dispatch({
        type: GET_ALL_EMPLOYEES,
        payload: response
    });
};

export const createEmployee = employee => async dispatch => {
    await EmployeesApi.createEmployee(employee);

    dispatch(getAllEmployees());
};

export const deleteEmployee = employeeId => async dispatch => {
    await EmployeesApi.deleteEmployee(employeeId);

    dispatch(getAllEmployees());
};

export const getEmployeeById = employeeId => async dispatch => {
    const response = await EmployeesApi.getEmployeeById(employeeId);

    dispatch({
        type: GET_CURRENT_EMPLOYEE,
        payload: response
    });
};