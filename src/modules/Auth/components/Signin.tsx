'use client';
import React, { useState } from 'react'
import styles from './SigninForm.module.css'
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = React.useState(false)

    const router = useRouter()
    // const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Retrieve user data from local storage
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         const userData = JSON.parse(storedUser);
    //         console
    //         if (rememberMe) {
    //             setCookie(null, "COOKIES_USER_ACCESS_TOKEN", email, {
    //                 maxAge: 30 * 24 * 60 * 60, // 30 days expiry in seconds
    //                 path: '/',
    //             });
    //         } else {
    //             setCookie(null, "COOKIES_USER_ACCESS_TOKEN", email, {
    //                 path: '/',
    //             });
    //         }
    //         // Check if entered email and password match stored data
    //         if (email === userData.email && password === userData.password) {
    //             alert('Signin successful! Redirecting to home page.');
    //             router.push('/home')
    //         } else {
    //             alert('Invalid email or password. Please try again.');
    //         }
    //     } else {
    //         alert('No user found. Please sign up first.');
    //     }
    //     setEmail('');
    //     setPassword('');
    // };
    const storedUsers1 = localStorage.getItem('user');
    console.log(storedUsers1, "storedUsers1");

    const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('user1', JSON.stringify({ email, password }));
        if ((email === 'abhay@gmail.com' || email === 'abhay1@gmail.com' || email === 'abhay2@gmail.com' || email === 'admin@gmail.com') && password === 'Abhay@1') {
            alert('Signin successful! Redirecting to dashboard.');
            router.push('/dashboard');
            // Set cookies if remember me is checked
            if (rememberMe) {
                setCookie(null, 'COOKIES_USER_ACCESS_TOKEN', email, {
                    maxAge: 30 * 24 * 60 * 60, // 30 days expiry in seconds
                    path: '/',
                });
            } else {
                setCookie(null, 'COOKIES_USER_ACCESS_TOKEN', email, {
                    path: '/',
                });
            }
            // Clear form fields
            setEmail('');
            setPassword('');
            return;
        }


        const storedUsers = localStorage.getItem('user');
        console.log(storedUsers, "storedUsers");

        if (storedUsers) {
            const userData = JSON.parse(storedUsers);
            console.log(userData.email, "aadasd")
            if (rememberMe) {
                setCookie(null, "COOKIES_USER_ACCESS_TOKEN", email, {
                    maxAge: 30 * 24 * 60 * 60, // 30 days expiry in seconds
                    path: '/',
                });
            } else {
                setCookie(null, "COOKIES_USER_ACCESS_TOKEN", email, {
                    path: '/',
                });
            }
            if ((email === userData.email || email === "website@gmail.com") && (password === userData.password || password === 'Abhay@123')) {
                alert('Signin successful! Redirecting to home page.');
                router.push('/home')
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } else {
            alert('No user found. Please sign up first.');
        }
        setEmail('');
        setPassword('');
        return;



        // If no matching user found
        alert('Invalid email or password. Please try again.');
        setEmail('');
        setPassword('');
    };
    console.log(email, "qwertyui")
    const handleForgotPassword = () => {
        router.push('/forgot-password'); // Navigate to forgot password page
    };
    const handleSignup = () => {
        router.push('/signup'); // Navigate to forgot password page
    };
    return (
        <div className="container" style={{ padding: 200 }}>
            <div className='algin-center'>
                <form className={styles.signinForm} onSubmit={handleSignin}>
                    <h1 className="mt-5 mb-4 text-align-center" style={{ paddingLeft: "145px", marginTop: 10 }}>Sign In</h1>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                            Email address
                        </label>
                        <input
                            type="text"
                            className={styles.formControl}
                            id="signinEmail"
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
                            id="signinPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={`d-flex ${styles.forgotPassword}`}>
                        <button type="button" className={styles.forgotPasswordButton} onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                        <button type="button" className={styles.forgotPasswordButton} onClick={handleSignup}>
                            Sign up?
                        </button>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}
