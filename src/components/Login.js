// import { Link, Navigate } from "react-router-dom";
import { useState } from 'react';


export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username)
        console.log(password)


    }

    return (
        <>
            <div className="wrap">
                <h2>Log In</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="controls">
                        <label htmlFor="username-field">username: </label>
                        <input
                            id="username-field"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="controls">
                        <label htmlFor="password-field">password: </label>
                        <input
                            id="password-field"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="form-submit">
                        <input type="submit" value="Log In" className="button" />
                        {/* <Link to={"/new-user"}><p className="new-user">New User? Create Account</p></Link> */}
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;