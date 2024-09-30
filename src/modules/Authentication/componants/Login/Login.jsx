import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faHouse,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useContext, useState } from 'react';
import {
  EmailValidation,
  PasswordValidation,
} from '../../../../constants/VALIDATION';
import 'react-toastify/dist/ReactToastify.css';
import { URLS } from '../../../../constants/END-POINT';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(URLS.Login, data);
      console.log(response);
      toast.success('Logged in successfully');
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      console.log('Navigating to dashboard');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(
        error.response?.data?.message || 'An error occurred'
      );
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleRegisterNow = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="login-container">
        <h4>Login</h4>
        <p>Welcome Back! Please Enter Your Details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="email-addon">
              <FontAwesomeIcon icon={faHouse} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Email"
              aria-label="Email"
              aria-describedby="email-addon"
              autoComplete="username"
              {...register('email', EmailValidation)}
            />
          </div>
          {errors.email && (
            <span className="text-danger">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="input-group mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="password-addon">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter Your Password"
              aria-label="Password"
              aria-describedby="password-addon"
              autoComplete="current-password"
              {...register('password', PasswordValidation)}
            />
            <button
              type="button"
              className="input-group-text"
              id="password-visibility-toggle"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEyeSlash : faEye}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="Links d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-link text-decoration-none"
            onClick={handleRegisterNow}
          >
            Register Now
          </button>
          <Link to="/forgetPassword" className="text-decoration-none">
            Forget Password
          </Link>
        </div>

        <button className="btn btn-success w-100 my-3">Login</button>
      </form>
    </>
  );
}
