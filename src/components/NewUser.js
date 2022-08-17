import { useState } from 'react';


export const NewUser = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(email)
        console.log(username)
        console.log(password)


    }

    return (
        <>
            <div className="wrap">
                <h2>Create an Account</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="controls">
                        <label htmlFor="email-field">email: </label>
                        <input
                            id="email-field"
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </div>
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
                        <input type="submit" value="Create Account" className="button" />
                        {/* <Link to={"/new-user"}><p className="new-user">New User? Create Account</p></Link> */}
                    </div>
                </form>
            </div>
        </>
    );
}

export default NewUser;