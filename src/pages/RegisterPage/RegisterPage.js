import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import LoaderContext from "../../contexts/loader-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import usePopUp from "../../hooks/use-popUp";

const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const RegisterPage = () => {

    const navigate = useNavigate();

    const { startLoader, stopLoader, } = React.useContext(LoaderContext);

    const [formIsInvalid, setFormIsInvalid] = React.useState(false);

    const {
        sendRequest: request,
        error: requestError,
    } = useHttp();

    const afterRequestFinished = () => {
        if (requestError) {
            setFormIsInvalid(true);
            navigate('/register');
        } else {
            navigate('/login');
        }
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(afterRequestFinished);

    const {
        value: enteredEmailValue,
        hasError: enteredEmailHasError,
        valueIsValid: enteredEmailIsValid,
        onChangeHandler: emailInputOnChangeHandler,
        onBlurHandler: emailInputOnBlurHandler,
        resetInput: resetEmailInput,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPasswordValue,
        hasError: enteredPasswordHasError,
        valueIsValid: enteredPasswordIsValid,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputOnBlurHandler,
        resetInput: resetPasswordInput,
    } = useInput(value => value.trim().length >= 6);

    const {
        value: enteredRepeatPasswordValue,
        hasError: enteredRepeatPasswordHasError,
        valueIsValid: enteredRepeatPasswordIsValid,
        onChangeHandler: repeatPasswordInputOnChangeHandler,
        onBlurHandler: repeatPasswordInputOnBlurHandler,
        resetInput: resetRepeatPasswordInput,
    } = useInput(value => value === enteredPasswordValue);

    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid || !enteredRepeatPasswordIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid, enteredRepeatPasswordIsValid]);

    const afterRegister = () => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
        stopLoader();
    };

    const afterRegisterErrorHandler = () => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
        resetEmailInput();
        resetPasswordInput();
        resetRepeatPasswordInput();
        stopLoader();
    };

    const onRegister = (e) => {
        e.preventDefault();



        const data = {
            email: enteredEmailValue,
            password: enteredPasswordValue,
            returnSecureToken: true,
        };


        const requestConfig = {
            action: 'register',
            data
        };

        startLoader();
        request(requestConfig, afterRegister, afterRegisterErrorHandler);

    };


    return (
        <>
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {requestError !== null && <ErrorPopUp message={requestError} />}
                    {requestError === null && <SuccessPopUp message={'Succesfuly registered'} />}
                </Modal>}
            <div class="hero common-hero">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="hero-ct">
                                <h1> Register</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-single">
                <div class="container">
                    <div class="row ipad-width" style={{ "display": "flex", "justifyContent": "center" }} >

                        <div class="col-md-9 col-sm-12 col-xs-12">
                            <div class="form-style-1 user-pro" action="#">

                                <form onSubmit={onRegister} action="#" class="password">

                                    <div class="row">
                                        <div class="col-md-6 form-it">
                                            <label>Email</label>
                                            <input type="text" placeholder="Enter email"
                                                value={enteredEmailValue}
                                                onChange={emailInputOnChangeHandler}
                                                onBlur={emailInputOnBlurHandler}
                                            />
                                            {enteredEmailHasError && <p>Email is incorect</p>}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 form-it">
                                            <label>Password</label>
                                            <input type="password" placeholder="Enter password"
                                                value={enteredPasswordValue}
                                                onChange={passwordInputOnChangeHandler}
                                                onBlur={passwordInputOnBlurHandler}
                                            />
                                            {enteredPasswordHasError && <p>Password must be at least 6 charackters</p>}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 form-it">
                                            <label>Repeat Password</label>
                                            <input type="password" placeholder="Repeat password"
                                                value={enteredRepeatPasswordValue}
                                                onChange={repeatPasswordInputOnChangeHandler}
                                                onBlur={repeatPasswordInputOnBlurHandler}
                                            />
                                            {enteredRepeatPasswordHasError && enteredRepeatPasswordValue === '' && <p>Password must be at least 6 charackters</p>}
                                            {enteredRepeatPasswordHasError && enteredRepeatPasswordValue !== '' && <p>Passwords does't match</p>}

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <input class="submit" disabled={formIsInvalid} type="submit" value="sign up" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;