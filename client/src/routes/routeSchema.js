import React from 'react';
import { Route } from 'react-router-dom';
import EmployeeList from '../components/employees/employeeList';
import EmployeeForm from '../components/employees/employeeForm';

const RouteSchema = () => [
    <Route key='employeeList' exact path='/' component={ EmployeeList }/>,
    <Route key='employeeCreateFrom' path='/employeeCreate' component={ EmployeeForm }/>,
    <Route key='employeeEditFrom' path='/employeeEdit/:employeeId' component={ EmployeeForm }/>,
];

export default RouteSchema;