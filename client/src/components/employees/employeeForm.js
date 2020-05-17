import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { 
    TextField,
    Checkbox,
    Button,
    Container
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createEmployee, getEmployeeById } from '../../actions/employees';


const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

const renderCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
);

const EmployeeForm = props => {
    const { handleSubmit, pristine, submitting, onSubmit, history, getEmployeeById } = props;

    useEffect(() => {
        let potentialId = history.location.pathname.slice(1).substr(history.location.pathname.slice(1).lastIndexOf('/') + 1);
        if (potentialId.length === 24) {
            getEmployeeById(potentialId);
        }
    }, [])

    const redirectToList = () => history.push("/");

    return (
        <Container fixed>
            <form onSubmit={ handleSubmit } initialValues={{name: '123'}}>
                <div style={{ margin: 15 }}>
                    <Field
                        name="name"
                        component={renderTextField}
                        label="Name"
                        fullWidth
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <Field
                        name="department"
                        component={renderTextField}
                        label="Department"
                        fullWidth
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <Field
                        name="active"
                        id="active"
                        component={renderCheckbox}
                        label="Active"
                    />
                </div>
                <div style={{ margin: 15 }}>
                    <Button onClick={handleSubmit(employee => { 
                        onSubmit(employee);
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
    onSubmit: employee => dispatch(createEmployee(employee)),
    getEmployeeById: employeeId => dispatch(getEmployeeById(employeeId))
})

const mapStateToProps = state => ({
    initialValues: state.employees.currentEmployee
})

export default compose (
    reduxForm({ form: 'employeeForm', enableReinitialize: true }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EmployeeForm);