'use client';
import React, { useState } from 'react'
import styles from './SigninForm.module.css'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server';
import cookies from 'next-cookies';
import { setCookie } from 'nookies';
// import { useRouter } from 'next/router';
export default function Signup() {
    // const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [rememberMe, setRememberMe] = React.useState(false)
    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({ email, password }));
        console.log('Submitted:', { email, password });
        const cookieOptions = {
            // 'max-age' is in seconds, adjust as needed
            'max-age': 86400, // 1 day
            // Other options can include 'expires', 'domain', 'path', 'secure', and 'httpOnly'
        };

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
        setEmail('');
        setPassword('');
        router.push('/signin'); 
        
      };
    return (
        <div className='algin-center'>
            <form className={styles.signinForm} onSubmit={handleSignup}>
                <h1 className="mt-5 mb-4 text-align-center" style={{ paddingLeft: "11 5px", marginTop: 10 }}>Sign Up</h1>
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
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Sign up
                </button>
            </form>
        </div>
    )
}
