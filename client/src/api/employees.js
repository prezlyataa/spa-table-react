import http from './http';

export const getAllEmployees = () =>
    http.getAllEmployees()
        .then(res => res);