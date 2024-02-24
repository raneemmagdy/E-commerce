import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email }
      );
      console.log(response.data.statusMsg)
      if (response.data.statusMsg=='success') {
        setStep(2);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        { resetCode: verificationCode }
      );
      console.log(response.data)
      if (response.data.status=='Success') {
        setStep(3);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        { email, newPassword }
      );
      console.log(response);
      if (response.status==200) {
        navigate('/'); 
      } else {
        setError(response.data.message);
        //console.log(response);
      }
    } catch (error) {
      setError(error.response.data.message);
     
    }
  };

  return (
    <>
    <Helmet>
        <title>Forget Password component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    <div>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Enter Your Email</h2>
          <input className='form-control py-2 my-2'type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && <p>{error}</p>}
          <button className='btn bg-main text-white' type="submit">Verify</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerificationSubmit}>
          <h2>Enter Verification Code</h2>
          <input className='form-control py-2 my-2' type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          {error && <p>{error}</p>}
          <button type="submit" className='btn bg-main text-white'>Verify</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <h2>Enter New Password</h2>
          <input className='form-control py-2 my-2'type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input  className='form-control py-2 my-2' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          {error && <p>{error}</p>}
          <button type="submit" className='btn bg-main text-white'>Reset Password</button>
        </form>
      )}
    </div></>
  );
}

export default ForgetPassword;
