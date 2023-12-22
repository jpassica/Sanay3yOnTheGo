import React, { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-up logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
