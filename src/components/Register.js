import { useState } from 'react';


export const RegisterForm = () => {

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
            <div className="register-wrap">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="register-field">
                        <label htmlFor="email-field" className="user-label">email: </label>
                        <input
                            id="email-field"
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="register-field">
                        <label htmlFor="username-field" className="user-label">username: </label>
                        <input
                            id="username-field"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="register-field">
                        <label htmlFor="password-field" className="user-label">password: </label>
                        <input
                            id="password-field"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="register-submit">
                        <input type="submit" value="Create Account" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;