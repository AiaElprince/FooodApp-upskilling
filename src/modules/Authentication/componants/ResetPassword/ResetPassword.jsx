import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EmailValidation, PasswordValidation } from '../../../../constants/VALIDATION';
import { useState } from 'react';
import { URLS } from '../../../../constants/END-POINT';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  let navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(URLS.reset, data);
      console.log(response);
      toast.success('Password reset successful');
      navigate('/login');
    } catch (error) {
      console.error('Error response:', error.response?.data?.message || error.message);
      toast.error('Failed to reset password');
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <>
      <div>
        <h1 className="h4 mb-2">Reset Password</h1>
        <p className="mb-0">Please enter your OTP or check your inbox.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="email-addon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="email-addon"
            {...register('email', EmailValidation)}
          />
        </div>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}

        <div className="input-group mb-3">
          <span className="input-group-text" id="seed-addon">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Seed"
            aria-label="Seed"
            aria-describedby="seed-addon"
            {...register('seed', {
              required: 'seed is required',})}
          />
        </div>
        {errors.seed && <p className="text-danger">{errors.seed.message}</p>}

        <div className="input-group mb-3">
          <span className="input-group-text" id="password-addon">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="form-control"
            placeholder="New Password"
            aria-label="NewPassword"
            aria-describedby="password"
            autoComplete="password"
            {...register('password', PasswordValidation)}
          />
          <button 
            type="button"
            className="input-group-text" 
            id="password-visibility-toggle"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
          </button> 
        </div>
        {errors.password && <p className="text-danger">{errors.password.message}</p>}

        <div className="input-group mb-3">
          <span className="input-group-text" id="confirm-password-addon">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="form-control"
            placeholder="Confirm New Password"
            aria-label="ConfirmNewPassword"
            aria-describedby="confirm-password-addon"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Confirm New Password is required',
             
            })}
          />
          <button 
            type="button"
            className="input-group-text" 
            id="confirm-password-visibility-toggle"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
          </button> 
        </div>
        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

        <button
          type='submit'
          className="btn btn-success d-block w-100 my-3"
          id="submit-button"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
