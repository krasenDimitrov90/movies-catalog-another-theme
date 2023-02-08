import React from "react";

const RegisterPage = () => {

    return (
        <section id="form-sign-up" className="view-section">
            <form className="text-center border border-light p-5" action="#" method="post">
                <div className="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" className="form-control" placeholder="Email" name="email" value="" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" className="form-control" placeholder="Password" name="password "
                        value="" />
                </div>

                <div className="form-group">
                    <label for="repeatPassword">Repeat Password</label>
                    <input id="repeatPassword" type="password" className="form-control" placeholder="Repeat-Password "
                        name="repeatPassword" value="" />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </section>
    );
};

export default RegisterPage;