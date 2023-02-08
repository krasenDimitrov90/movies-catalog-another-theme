import React from "react";

const LoginPage = () => {

    return (
        <section id="form-login" className="view-section">
            <form className="text-center border border-light p-5" action="" method="">
                <div className="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" className="form-control" placeholder="Email" name="email" value="" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" className="form-control" placeholder="Password" name="password"
                        value="" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </section>
    );
};

export default LoginPage;