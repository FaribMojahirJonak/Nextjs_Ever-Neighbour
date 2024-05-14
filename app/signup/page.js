"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`http://localhost:3000/admin/registration`, values);
      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      setSignupError('Signup failed. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {signupError && <p className="text-red-500 mb-4">{signupError}</p>}
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;