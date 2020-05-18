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
    TableFooter,
    TablePagination
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
    getAllEmployees,
    deleteEmployee,
    searchEmployees
} from '../../actions/employees';
import Pagination from './pagination';

const useStyles = makeStyles({
    searchField: {
      margin: "10px 0 20px",
    },
});

const EmployeeList = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { getAllEmployees, deleteEmployee, employees, history, searchEmployees } = props;

    useEffect(() => { getAllEmployees() }, []);
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

    const handleRedirectToEmployeeForm = () => history.push("/employeeCreate");

    const handleDeleteEmployee = employeeId => deleteEmployee(employeeId);

    const handleRedirectToEditForm = employeeId => history.push(`/employeeEdit/${employeeId}`);

    return (
        <Container fixed>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <TextField onChange={e => searchEmployees(e.target.value)} className={classes.searchField} id="outlined-basic" label="Search" variant="outlined" />
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
                        {(rowsPerPage > 0
                            ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : employees
                        ).map(employee => (
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
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={employees.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={Pagination}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
};

const mapDispatchToProps = dispatch => ({
    getAllEmployees: () => dispatch(getAllEmployees()),
    deleteEmployee: employeeId => dispatch(deleteEmployee(employeeId)),
    searchEmployees: query => dispatch(searchEmployees(query))
})

const mapStateToProps = state => ({
    employees: state.employees.employees,
})

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(EmployeeList);