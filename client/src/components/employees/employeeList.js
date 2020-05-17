import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { 
    makeStyles,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
    getAllEmployees,
    deleteEmployee
} from '../../actions/employees';

const useStyles = makeStyles({
    searchField: {
      margin: "10px 0 20px",
    },
});

const EmployeeList = (props) => {
    const classes = useStyles();
    const { getAllEmployees, deleteEmployee, employees, history } = props;

    useEffect(() => { getAllEmployees() }, []);

    const handleRedirectToEmployeeForm = () => history.push("/employeeCreate");

    const handleDeleteEmployee = employeeId => deleteEmployee(employeeId);

    const handleRedirectToEditForm = employeeId => history.push(`/employeeEdit/${employeeId}`);

    return (
        <Container fixed>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <TextField className={classes.searchField} id="outlined-basic" label="Search" variant="outlined" />
                <Button onClick={() => handleRedirectToEmployeeForm()}>Create employee</Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="employee table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Active</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(employee => (
                            <TableRow key={`${employee._id}.${employee.name}`}>
                                <TableCell component="th" scope="row" align="center">{employee._id}</TableCell>
                                <TableCell align="center">{employee.name}</TableCell>
                                <TableCell align="center">{employee.department}</TableCell>
                                <TableCell align="center">{`${employee.active}`}</TableCell>
                                <TableCell align="center">
                                    <>
                                        <IconButton aria-label="edit" onClick={() => handleRedirectToEditForm(employee._id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteEmployee(employee._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

const mapDispatchToProps = dispatch => ({
    getAllEmployees: () => dispatch(getAllEmployees()),
    deleteEmployee: employeeId => dispatch(deleteEmployee(employeeId))
})

const mapStateToProps = state => ({
    employees: state.employees.employees,
})

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(EmployeeList);