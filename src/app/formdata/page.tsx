"use client";
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter();

    const [state, setState] = useState(() => {
        // Check localStorage for saved form data
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            firstName: '',
            lastName: '',
            email: '',
            description: ''
        };
    });

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(state));
    }, [state]);

    const handleChange = (e:any) => {
        const { id, value } = e.target;
        setState((prevState:any) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFormSubmit = (event:any) => {
        event.preventDefault();
        const formData = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            description: state.description
        };
        localStorage.removeItem('formData');

        // Clear state
        setState({
            firstName: '',
            lastName: '',
            email: '',
            description: ''
        });

        // Redirect or navigate to another page
        router.push('/dashboard');
    };

    const onSubmit = () => {
        router.back();
    };

    return (
        <div className="container">
            <h1 className="mt-5">Add Page</h1>
            <button className="" onClick={onSubmit}>Back</button>
            <div className="row mt-5">
                <div className='col-8 align-center'>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={state.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={state.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={state.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                value={state.description}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary align-self-start">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
