/* import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', password: '', picture: null }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone number is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        picture: Yup.mixed().required('Picture is required'),
      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number:</label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="phone" />
            <ErrorMessage name="phone" component="p" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" />
            <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">Picture:</label>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name="picture" accept="image/*"  />
            <ErrorMessage name="picture" component="p" className="text-red-500 text-xs italic" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm; */