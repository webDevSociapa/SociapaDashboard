"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Paper } from '@mui/material';

export default function LoginComponent() {
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    // useEffect(() => {
    //     // Check if user is already logged in
    //     const isLoggedIn = localStorage.getItem('loggedIn');
    //     if (isLoggedIn === 'true') {
    //         router.push('/dashboard');
    //     }
    // }, [router]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/login", formData);
            if (response.data.status === 200) {
                // Save loggedIn state to localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('sheetName1', response.data.usersData.fileName1);
                localStorage.setItem('sheetName2', response.data.usersData.fileName2);
                localStorage.setItem('sheetName3', response.data.usersData.fileName3);
                localStorage.setItem('sheetName4', response.data.usersData.fileName4);
                localStorage.setItem('sheetName5', response.data.usersData.fileName5);
                localStorage.setItem('brandName', response.data.usersData.brandName);
                // Show success toast
                toast.success('Login successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                router.push('/');
                // Delay redirect to allow toast to be seen
            } else {
                // Show error toast
                toast.error('Login failed. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Please fill correct credentials.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <Paper>
            <div className="min-h-screen flex">
                {/* Left Side - Login Form */}
                <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                    <div className="w-full max-w-sm">
                        {/* Logo */}
                        {/* <div className="mb-8 flex justify-center">
                        <Image src="/path-to-your-logo.png" alt="Logo" width={100} height={40} />
                    </div> */}

                        {/* Sign In Form */}
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sign in to your account</h1>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center text-sm">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-gray-900">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full rounded-md bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:ring-2 focus:ring-black"
                            >
                                Sign in
                            </button>
                        </form>



                        {/* Sign Up Link */}
                        {/* <button
                            type="button"
                            onClick={() => router.push('/sign-up')}
                            className="mt-6 w-full rounded-md border border-gray-300 py-2 text-sm text-gray-900 hover:bg-gray-100"
                        >
                            Create an account
                        </button> */}
                    </div>
                </div>

                {/* Right Side - Image */}
                {/* <div className="hidden lg:block lg:flex-1">
                <Image
                    src="/path-to-your-image.jpg"
                    alt="Workspace"
                    layout="fill"
                    objectFit="cover"
                />
            </div> */}

                {/* Toast Container */}
                <ToastContainer />
            </div>
        </Paper>
    );
}

