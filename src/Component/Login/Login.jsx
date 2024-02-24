import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useNavigate, Link } from 'react-router-dom'; 
import * as Yup from 'yup';
import { userContext } from '../../UserContext';



export default function Login() {
  let { setisUser, setLogin } = useContext(userContext);

  const navigate = useNavigate();
  let [Loading, setLoading] = useState(false);
  let [msg, setMsg] = useState('');

  // Function to handle login
  async function getLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      console.log(data);
      if (data.message === 'success') {
        setisUser(data.token);
        setLogin(data.user.name);
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.user.name);

        navigate('home');
        setMsg('');
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }
  async function handleForgotPassword(email) {
    try {
      setLoading(true);
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email });
      console.log(data);
      setMsg('Reset code sent to your email.');
      setLoading(false);
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }
  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password is not valid'),
  });

  // Formik form
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: getLogin,
  });

  return (
    <>
      <h4>Login Now:</h4>
      <form className="w-75 m-auto my-4" onSubmit={formik.handleSubmit}>
        {msg ? <p className="alert alert-danger">{msg}</p> : ''}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control mb-2"
          value={formik.values.email}
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ''
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control mb-2"
          value={formik.values.password}
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ''
        )}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn green-color text-white d-block ms-auto"
        >
          {Loading ? (
            <Bars height="30" width="50" color="#fff" ariaLabel="bars-loading" visible={true} />
          ) : (
            'Login'
          )}
        </button>
        
        <Link to="/forgot-password">Forgot Password?</Link>
      </form>
    </>
  );
}
