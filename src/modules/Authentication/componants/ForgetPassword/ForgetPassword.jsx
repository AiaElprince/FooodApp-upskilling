import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import style from '../auth.module.css';

import { useNavigate } from 'react-router-dom';
import {URLS} from '../../../../constants/END-POINT';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
  let navigate =useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

    let onSubmit=async (data)=>{
      try {
        let response = await axios.post(URLS.resetRequest,data)
        console.log(response)
        navigate('/resetpassword')
      } catch (error) {
        toast.error(error.response)
        console.log(error)
      }
    }
  return (
    <>
   
            <div className='forgerpassword-container'>
              <h4>Forget Password</h4>
              <p>No worries ! please Enter Youe Email and we will send you a password reset link</p>
            </div>
            
              <form onSubmit={handleSubmit(onSubmit)} >
              
                <div className="input-group mb-3">
                <div className="input-group mb-1">
                  <span className='input-group-text' id='basic-addon1'>
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    {...register('email',{ required: 'email is required' })}
                  />
                </div>
               {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 my-3'> Submit</button>

              </form>
           
  </>
  )
}
