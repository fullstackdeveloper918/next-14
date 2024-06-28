// components/ForgotPasswordForm.tsx
'use client';
import React, { useState } from 'react';
import styles from './SigninForm.module.css'
import { useRouter } from 'next/navigation';
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Retrieve user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.email === email) {
                // Update password in local storage
                localStorage.setItem('user', JSON.stringify({ ...userData, password: newPassword }));
                setMessage('Password updated successfully!');
                setEmail('');
                setNewPassword('');
                router.push('/signin'); 
            } else {
                setMessage('Email not found. Please enter a valid email.');
            }
        } else {
            setMessage('No user found. Please sign up or contact support.');
        }
    };

    return (
        <>
            {/* <div className="container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
            </div> */}
            <div  className="container" style={{padding:200}}>
            <div className='algin-center'>
                                {/* <h2>Forgot Password</h2> */}
                <form className={styles.signinForm} onSubmit={handleResetPassword}>
                    <h1 className="mt-5 mb-4 text-align-center" >Forgot Password</h1>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                            Email address
                        </label>
                        <input
                            type="email"
                            className={styles.formControl}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>
                            Password
                        </label>
                        <input
                            type="password"
                            className={styles.formControl}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
            </div>
            </div>
        </>

    );
};

export default ForgotPasswordForm;
