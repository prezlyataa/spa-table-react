import http from './http';

export const getAllEmployees = () =>
    http.getAllEmployees()
        .then(res => res);

export const createEmployee = employee =>
    http.createEmployee(employee);

export const deleteEmployee = employeeId =>
    http.deleteEmployee(employeeId);

export const getEmployeeById = employeeId =>
    http.getEmployeeById(employeeId);
