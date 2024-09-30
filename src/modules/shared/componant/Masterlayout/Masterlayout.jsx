import Sidebar from '../SideBarrrr/SideBarrrr';
import Navbar from '../Navbar/Navbar'
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
export default function Masterlayout() {
  let {loginData} = useContext(AuthContext)
  return (
    <>
    <div className=" d-flex vh-100 w-100 h-100">
      <div className="">
        <Sidebar/>
      </div>
      <div className=" w-100">
        <Navbar loginData={loginData}/>
        <Outlet/>
        </div>   
       </div>
    </>
  )
}
