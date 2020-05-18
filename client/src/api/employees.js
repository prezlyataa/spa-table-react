import http from './http';

export const getAllEmployees = () =>
    http.getAllEmployees()
        .then(res => res);

export const searchEmployees = query =>
    http.searchEmployees(query);

export const createEmployee = employee =>
    http.createEmployee(employee);

export const updateEmployee = (employeeId, employee) =>
    http.updateEmployee(employeeId, employee);

export const deleteEmployee = employeeId =>
    http.deleteEmployee(employeeId);

export const getEmployeeById = employeeId =>
    http.getEmployeeById(employeeId);
