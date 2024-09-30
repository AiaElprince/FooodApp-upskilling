import { Outlet, useNavigate } from "react-router-dom";
import logo from '../../../../assets/logo.png'; 
import '../../../../App.css';
import { useEffect } from "react";

export default function AuthLayout() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]); 

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white p-3 rounded rounded-4">
              <div className="text-center mb-3">
                <img src={logo} alt="logo" className="w-100" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
