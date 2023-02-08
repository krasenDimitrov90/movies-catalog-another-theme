import React from "react";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";

const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const LoginPage = () => {

    const navigate = useNavigate();

    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { login } = React.useContext(AuthContext);

    const {
        isLoading,
        error,
        sendRequest: request,
    } = useHttp();

    const {
        value: enteredEmailValue,
        valueIsValid: enteredEmailIsValid,
        onChangeHandler: emailInputOnChangeHandler,
        onBlurHandler: emailInputOnBlurHandler,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPasswordValue,
        valueIsValid: enteredPasswordIsValid,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputOnBlurHandler,
    } = useInput(value => value.trim().length >= 6);

    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid]);

    const afterLogin = (userData) => {
        login(userData.idToken, userData.localId, userData.email);
        navigate('/');
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

        request(requestConfig, afterLogin);

    };

    return (
        <>
            {isLoading && <SpinnerModal />}
            <section id="form-login" className="view-section" onSubmit={onLogin} >
                <form className="text-center border border-light p-5" action="" method="">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-control" placeholder="Email" name="email" value={enteredEmailValue}
                            onChange={emailInputOnChangeHandler}
                            onBlur={emailInputOnBlurHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-control" placeholder="Password" name="password" value={enteredPasswordValue}
                            onChange={passwordInputOnChangeHandler}
                            onBlur={passwordInputOnBlurHandler}
                        />
                    </div>

                    <button type="submit" disabled={formIsInvalid} className="btn btn-primary">Login</button>
                </form>
            </section>
        </>
    );
};

export default LoginPage;