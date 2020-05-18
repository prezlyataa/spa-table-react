import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import CustomTextField from '../common/customTextField';
import CustomCheckbox from '../common/customCheckbox';
import { createEmployee, updateEmployee, getEmployeeById, resetCurrentEmployee } from '../../actions/employees';

const EmployeeForm = props => {
    const [employeeId, setEmployeeId] = useState(null);

    const { 
        handleSubmit,
        pristine,
        submitting,
        createEmployee,
        updateEmployee,
        history,
        getEmployeeById,
        resetCurrentEmployee,
    } = props;

    useEffect(() => {
        const currentPath = history.location.pathname.slice(1);
        const potentialId = currentPath.substr(currentPath.lastIndexOf('/') + 1);

        if (potentialId.length === 24) {
            getEmployeeById(potentialId);
            setEmployeeId(potentialId);
        } else {
            resetCurrentEmployee();
        }
    });

    const redirectToList = () => history.push("/");

    return (
        <Container fixed>
            <form onSubmit={ handleSubmit }>
                <div style={{ margin: 15 }}>
                    <Field
                        name="name"
                        component={CustomTextField}
                        label="Name"
                        fullWidth
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <Field
                        name="department"
                        component={CustomTextField}
                        label="Department"
                        fullWidth
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <Field
                        name="active"
                        id="active"
                        component={CustomCheckbox}
                        label="Active"
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <Button onClick={handleSubmit(employee => { 
                        employeeId ? updateEmployee(employeeId, employee) : createEmployee(employee);
                        redirectToList();
                    })} type="submit" variant="contained" color="primary" disabled={pristine || submitting}>
                        Save
                    </Button>
                </div>
            </form>
        </Container>
    );
};


const mapDispatchToProps = dispatch => ({
    createEmployee: employee => dispatch(createEmployee(employee)),
    updateEmployee: (employeeId, employee) => dispatch(updateEmployee(employeeId, employee)),
    getEmployeeById: employeeId => dispatch(getEmployeeById(employeeId)),
    resetCurrentEmployee: () => dispatch(resetCurrentEmployee()),
})

const mapStateToProps = state => ({
    initialValues: state.employees.currentEmployee
})

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ form: 'employeeForm', enableReinitialize: true }),
    withRouter
)(EmployeeForm);