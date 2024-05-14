import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label>Name:</label>
          <Field type="text" name="name" style={{ color: 'black' }} />
          <ErrorMessage name="name" />
        </div>
        <div>
          <label>Email:</label>
          <Field type="email" name="email" style={{ color: 'black' }} />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label>Phone Number:</label>
          <Field type="text" name="phone" style={{ color: 'black' }} />
          <ErrorMessage name="phone" />
        </div>
        <div>
          <label>Password:</label>
          <Field type="password" name="password" style={{ color: 'black' }} />
          <ErrorMessage name="password" />
        </div>
        <button type="submit">Sign Up</button>
      </Form>
    </Formik>
  );
};

export default SignupForm;