import React from 'react';
import { Route } from 'react-router-dom';
import EmployeeList from '../components/employees/employeeList';

const RouteSchema = () => [
    <Route key='employeeList' exact path='/' component={ EmployeeList }/>,
];

export default RouteSchema;