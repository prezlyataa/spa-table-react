import React from 'react';
import { connect } from 'react-redux';
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getAllEmployees } from '../../actions/employees';

const useStyles = makeStyles({
    searchField: {
      margin: "10px 0 20px",
    },
});

const mockData = [
    {
        id: 1,
        name: 'first',
        active: true,
        department: 'some department'
    },
    {
        id: 2,
        name: 'second',
        active: true,
        department: 'some department'
    },
    {
        id: 3,
        name: 'third',
        active: true,
        department: 'some department'
    }
];

const EmployeeList = (props) => {
    const classes = useStyles();
    const { getAllEmployees } = props;

    getAllEmployees();

    return (
        <Container fixed>
            <TextField className={classes.searchField} id="outlined-basic" label="Search" variant="outlined" />
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
                        {mockData.map(employee => (
                            <TableRow key={`${employee.id}.${employee.name}`}>
                                <TableCell component="th" scope="row" align="center">{employee.id}</TableCell>
                                <TableCell align="center">{employee.name}</TableCell>
                                <TableCell align="center">{employee.department}</TableCell>
                                <TableCell align="center">{`${employee.active}`}</TableCell>
                                <TableCell align="center">
                                    <>
                                        <IconButton aria-label="view">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete">
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
})

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);