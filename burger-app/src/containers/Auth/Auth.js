import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth, setAuthRedirectPath } from '../../redux/actions/auth';

import Spinner from '../../components/UI/Spinner/Spinner';
import checkValidity from '../../validation/formValidation';

import classes from './Auth.module.css';

const Auth = props => {

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignup] = useState(true);

    const {
        onSetAuthRedirectPath,
        buildingBurger,
        authRedirectPath
    } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

    const inputChangedHandler = (event, inputId) => {

        const updatedControls = {
            ...authForm
        };
        const updatedFormElement = {
            ...updatedControls[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedControls[inputId] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].value && formIsValid
        }

        setAuthForm(updatedControls);

    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(
            authForm.email.value,
            authForm.password.value,
            isSignup
        );
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    const formElements = []
    for (let key in authForm) {
        formElements.push({
            id: key,
            config: authForm[key]
        })
    }

    let form = (
        formElements.map(element => (
            <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                changed={(event) => inputChangedHandler(event, element.id)}
                touched={element.config.touched}
            />
        ))
    );

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
                {props.error.message.replace("_", " ")}
            </p>
        )
    }

    const title = isSignup ? 'SIGNUP' : 'LOGIN'

    let authenticateForm = <Spinner />

    if (!props.loading) {
        authenticateForm = (
            <React.Fragment>
                <h1>{title}</h1>
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">
                        CONFIRM
                    </Button>
                </form>
                <Button btnType="Danger" clicked={switchAuthModeHandler}>
                    SWITCH TO {isSignup ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </React.Fragment>
        )
    }

    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {authenticateForm}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapActionsToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Auth);