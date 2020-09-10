import React from 'react';
import './App.css';
import * as Yup from 'yup';
import axios from 'axios';

 import {Formik, Form, Field } from 'formik';

 

const AppForm = () => {
  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.
const userExample = { "name": "james", "job": "jamesman" };

   const SignupSchema = Yup.object().shape({
   firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('First Name Required'),
   lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Last Name Required'),
   email: Yup.string()
     .email('Invalid email')
     .required('Email is Required'),
 });

  return (

    <Formik       initialValues={{
         firstName: '',
         lastName: '',
         email: '',
       }}
           onSubmit= {values => {
      alert(JSON.stringify(values, null, 2));
      axios.post('https://reques.in/api/users', values).then(res => {
      console.log(res);
      console.log(res.data);
    })}}
       validationSchema={SignupSchema}>
   {({ errors, touched }) => (
    <Form>
          <label>First Name </label>
           <Field name="firstName" />
           {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}
          <label>Last Name </label>
           <Field name="lastName" />
           {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
           ) : null}
          <label>Email </label>
           <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <label>Terms of Service </label>
          <Field type="checkbox" name="checkbox" />

      <button type="submit">Submit</button>
    </Form>
   )}
  </Formik>
  );
};

export default AppForm;