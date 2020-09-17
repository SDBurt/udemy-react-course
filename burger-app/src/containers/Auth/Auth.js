import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth, setAuthRedirectPath } from '../../redux/actions/auth';

import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
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
        },
        formIsValid: false,
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase());
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, inputId) => {

        const updatedControls = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedControls[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedControls[inputId] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].value && formIsValid
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {


        const formElements = []
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
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
                    changed={(event) => this.inputChangedHandler(event, element.id)}
                    touched={element.config.touched}
                />
            ))
        );

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    {this.props.error.message.replace("_", " ")}
                </p>
            )
        }

        const title = this.state.isSignup ? 'SIGNUP' : 'LOGIN'

        let authenticateForm = <Spinner />

        if (!this.props.loading) {
            authenticateForm = (
                <React.Fragment>
                    <h1>{title}</h1>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success" clicked={this.formSubmitHandler} disabled={!this.state.formIsValid}>
                            CONFIRM
                    </Button>
                    </form>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                        SWITCH TO {this.state.isSignup ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </React.Fragment>
            )
        }

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }



        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {authenticateForm}
            </div>
        )
    }
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