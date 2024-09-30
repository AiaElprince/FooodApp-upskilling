import { useState } from 'react';
import { useForm } from "react-hook-form";
import { EmailValidation, PasswordValidation } from "../../../../constants/VALIDATION";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe, faLock, faPhone, faUserPen, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { URLS } from "../../../../constants/END-POINT";
import { toast } from 'react-toastify';
import './register.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  let navigate = useNavigate()

  const appendToFormData = (data) => {
    const formData = new FormData(); 
    formData.append('userName', data.userName);
    formData.append('country', data.country);
    formData.append('password', data.password);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('profileImage', data.profileImage[0]); 

    return formData;
  };

  const onSubmit = async (data) => {
    let registerData = appendToFormData(data);
    try {
      let response = await axios.post(URLS.Register, registerData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data.data);
      toast.success('Registered successfully');
      navigate('/verify-account')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to register';
      console.error(message);
      toast.error(message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
     
      <div className="container">
        <div className="text-center mb-4">
          <h4>Register</h4>
          <span>Welcome Back! Please enter your details...</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
          <div className="row">
            <div className="col-md-6 mb-3">
              {/* Input for Name */}
              <div className="form-group position-relative mb-3">
                <FontAwesomeIcon 
                  icon={faUserPen} 
                  className="position-absolute" 
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#495057' }} 
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  style={{ paddingLeft: '35px' }}
                  {...register('userName', { required: "Please enter your name" })}
                />
                {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
              </div>

              {/* Input for Country */}
              <div className="form-group position-relative mb-3">
                <FontAwesomeIcon 
                  icon={faGlobe} 
                  className="position-absolute" 
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#495057' }} 
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your country"
                  {...register('country', { required: 'Country is required' })}
                  style={{ paddingLeft: '35px' }}
                />
                {errors.country && <span className="text-danger">{errors.country.message}</span>}
              </div>

              {/* Input for Password */}
              <div className="form-group position-relative mb-3">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="position-absolute" 
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#495057' }} 
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  {...register('password', PasswordValidation)}
                  style={{ paddingLeft: '35px' }}
                />
                <FontAwesomeIcon 
                  icon={passwordVisible ? faEyeSlash : faEye} 
                  className="position-absolute" 
                  style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#495057' }} 
                  onClick={togglePasswordVisibility}
                />
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              {/* Input for Email */}
              <div className="form-group position-relative mb-3">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="position-absolute" 
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#495057' }} 
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  {...register('email', EmailValidation)}
                  style={{ paddingLeft: '35px' }}
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </div>

              {/* Input for Phone */}
              <div className="form-group position-relative mb-3">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="position-absolute" 
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#495057' }} 
                />
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  style={{ paddingLeft: '35px' }}
                />
                {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
              </div>

              {/* Input for Confirm Password */}
              <div className="form-group position-relative mb-3">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="position-absolute" 
                  style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#495057' }} 
                />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm your password"
                  {...register('confirmPassword', { required: 'Please confirm your password' })}
                  style={{ paddingLeft: '35px' }}
                />
                <FontAwesomeIcon 
                  icon={confirmPasswordVisible ? faEyeSlash : faEye} 
                  className="position-absolute" 
                  style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#495057' }} 
                  onClick={toggleConfirmPasswordVisibility}
                />
                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
              </div>
            </div>
          </div>

          {/* Input for Profile Image */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="file"
                  className="form-control"
                  id="customFile"
                  {...register('profileImage', { required: 'Add your image' })}
                  style={{ display: 'none' }} // Hide the default file input
                />
                <label className="form-control" htmlFor="customFile">Choose file</label>
                {errors.profileImage && <span className="text-danger">{errors.profileImage.message}</span>}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-success" type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
