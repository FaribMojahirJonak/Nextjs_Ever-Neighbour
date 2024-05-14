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
    <div>
      <h1>Sign Up</h1>
      {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;