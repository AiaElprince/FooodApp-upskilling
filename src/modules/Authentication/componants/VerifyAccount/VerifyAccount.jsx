import { faHouse, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import { EmailValidation } from "../../../../constants/VALIDATION";
import axios from "axios";
import { URLS } from "../../../../constants/END-POINT";



export default function VerifyAccount() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        console.log('Submitting data:', data); // Log the data being sent
        try {
            let response = await axios.put(URLS.verifyAccount, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(response.data.message);
            navigate('/login');
            console.log('Response:', response.data);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('API Error:', error.response.data);
                toast.error(`Verification failed: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                // No response was received
                console.error('No response:', error.request);
                toast.error('Verification failed: No response from server');
            } else {
                // Other errors
                console.error('Error:', error.message);
                toast.error('Verification failed: Something went wrong');
            }
        }
    };
  return (
   <>
          <ToastContainer/>
      <div className='verify-container'>
                  <h4>Verify Your Account Now !</h4>
                  <p>Welcome ... Please Enter Your Details</p>
                </div>
              <form onSubmit={handleSubmit(onSubmit)}>
             <div className='mb-3'>
             <div className="input-group mb-1 ">
                  <span className="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    {...register('email', EmailValidation)}
                  />
                </div>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}

             </div>
                <div className="input-group mb-3">
             <div className="input-group mb-1 ">

                  <span className="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type='text'
                    className="form-control"
                    placeholder="Enter Your Code"
                    aria-label="Code"
                    aria-describedby="basic-addon1"
                    {...register('code',{required:'please enter your code '})}
                  />
          </div>
          {errors.code && <p className="text-danger">{errors.code.message}</p>}
                </div>
                {/* <div className="Links d-flex justify-content-between">
                  <Link to="/resetPassword" className="text-decoration-none" onClick={navigate('/login')}>verify Now</Link>
                </div> */}
                <button className="btn btn-success w-100 my-3">Verify Now</button>
              </form>
   </>
  )
}
