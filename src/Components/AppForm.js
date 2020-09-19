import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

const AppForm = ({ errors, touched, values }) => {
  return (
    <div className='form-container'>
      <h1>Get Onboard!</h1>

      <Form>
        <Field
          type='name'
          name='name'
          placeholder='Name'
          autoComplete='new-name'
          className='input'
        />
        {touched.name && errors.name && <p className='error'>{errors.name}</p>}
        <Field
          type='email'
          name='email'
          placeholder='Email'
          className='input'
        />
        {touched.email && errors.email && (
          <p className='error'>{errors.email}</p>
        )}
        <Field
          type='password'
          name='password'
          autoComplete='new-password'
          placeholder='Password'
          className='input'
        />
        {touched.password && errors.password && (
          <p className='error'>{errors.password}</p>
        )}
        <label className='term'>
          <Field type='checkbox' name='term' checked={values.term} /> I agree to
          the <a href='https://lasr.cs.ucla.edu/lasr-members/reiher/elves.html
          '>Terms and Conditions</a>
        </label>
        <button type='submit' className='submit'>
          Submit
        </button>
      </Form>
    </div>
  )
}

const FormikApp = withFormik({
  mapPropsToValues({ name, email, password, term }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      term: term || false
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Name Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required'),
    password: Yup.string()
      .min(2, 'Password Too Short!')
      .max(28, 'Calm down there...')
      .required(),
  }),
  handleSubmit(values, { resetForm }) {
    console.log(values)
    resetForm()
  }
})
const PopulatedAppForm = FormikApp(AppForm)

export default PopulatedAppForm;
