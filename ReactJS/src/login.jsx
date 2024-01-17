import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    let authtype="Local"
    let appType="App"
    let os="Android"
    let brand="Samsung A50"
    let modelNo="SM-A12E"
    let serialNumber="SA4545as45a4"
    let versionNumber="1.0"
    let latitude=127.55545
    let longitude= -7.5555454965


    event.preventDefault();

    try {
      // Replace 'your-login-api-endpoint' with your actual login API endpoint
      const response = await axios.post( `${process.env.REACT_APP_API_URL}/auth/v1/login`, {
        email,
        password,
        authtype,
        appType,
        os,
        brand,
        modelNo,
        serialNumber,
        versionNumber,
        latitude,
        longitude
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login successful', response.data.result);

      if(response?.data?.statusCode===201&&response?.data?.result){
        localStorage.setItem('token', response?.data?.result?.accesToken);

         return navigate("/movies")
      }

      // Handle the API response (e.g., redirect, show a success message)
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          setError(error?.response?.data.message);
        } else {
          setError('An unexpected error occurred');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred');
      }

    }
  };

  console.log("erorrorororr",error);

  return (
    <div className=" ">
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{height: '82.5vh'}}>
        <form className="w-25" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center login-title">Sign in</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <div className="invalid-feedback d-block">{error?.email.join(', ')}</div>
            )}
          </div>
          <div className="input-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error?.password && (
              <div className="invalid-feedback d-block">{error?.password.join(', ')}</div>
            )}
          </div>
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className="form-check-label login-title"
              htmlFor="flexCheckDefault"
            >
              Remember me
            </label>
          </div>
        
          <button type="submit" className="btn btn-primary login-button">
            Sign in
          </button>
          { typeof error ==="string" && (
              <div className="invalid-feedback d-block">{error}</div>
            )}
        </form>
      </div>
        <div className='position-relative bottom-0'>
          <img
            src="/images/bottom-img.png"
            alt="Bottom Image"
            className="footer-image"
          />
      </div>
    </div>
  );
}

export default Login;
