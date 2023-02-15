import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import AuthContext from "../../contexts/auth-context";
import LoaderContext from "../../contexts/loader-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import usePopUp from "../../hooks/use-popUp";

const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const LoginPage = () => {

    const navigate = useNavigate();

    const { startLoader, stopLoader, } = React.useContext(LoaderContext);

    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { login } = React.useContext(AuthContext);

    const {
        sendRequest: request,
        error: requestError,
    } = useHttp();

    const afterRequestLoginFinished = () => {
        if (requestError) {
            setFormIsInvalid(true);
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(afterRequestLoginFinished);

    const {
        value: enteredEmailValue,
        hasError: enteredEmailHasError,
        valueIsValid: enteredEmailIsValid,
        onChangeHandler: emailInputOnChangeHandler,
        onBlurHandler: emailInputOnBlurHandler,
        resetInput: resetEnteredEmailInput,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPasswordValue,
        hasError: enteredPasswordHasError,
        valueIsValid: enteredPasswordIsValid,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputOnBlurHandler,
        resetInput: resetEnteredPasswordInput,
    } = useInput(value => value.trim().length >= 6);

    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid, navigate]);

    const afterLogin = (userData) => {
        login(userData.idToken, userData.localId, userData.email);
        setModalIsOpen(true);
        setRequestIsFinished(true);
        stopLoader();
    };

    const afterLoginErrorHandler = (err) => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
        resetEnteredPasswordInput();
        resetEnteredEmailInput();
        stopLoader();
    };



    const onLogin = (e) => {
        e.preventDefault();



        const data = {
            email: enteredEmailValue,
            password: enteredPasswordValue,
            returnSecureToken: true,
        };


        const requestConfig = {
            action: 'login',
            data
        };

        startLoader();
        request(requestConfig, afterLogin, afterLoginErrorHandler);
        
    };

    return (
        <>
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {requestError !== null && <ErrorPopUp message={requestError} />}
                    {requestError === null && <SuccessPopUp message={'Succesfuly logged in'} />}
                </Modal>}
            <div class="hero common-hero">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="hero-ct">
                                <h1> Log in</h1>
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

                                <form action="#" class="password" onSubmit={onLogin}>

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
                                        <div class="col-md-2">
                                            <input class="submit" type="submit" disabled={formIsInvalid} value="login" />
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

export default LoginPage;