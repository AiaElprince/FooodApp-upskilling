
import { Sidebar as ProSidebar, Menu, MenuItem,} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import togger from '../../../../assets/3.png';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../../context/AuthContext';
export default function Sidebar() {
  let {loginData} = useContext(AuthContext);

  const[isCollapse,setisCollapse]=useState(false)
  const collapse=()=>{
    setisCollapse(!isCollapse)
  }
  const navigate = useNavigate()
  return (
    
    <div className="sidebarContainer vh-100 h-100 w-100  ">
      <ProSidebar className='vh-100 'collapsed={isCollapse}>
        <Menu>
          <MenuItem 
          className='firstItem my-5 ps-3 '
           icon={<img onClick={collapse}
            src={togger} alt="togger"
             style={{
              width: isCollapse ? '8rem': '15rem',
              transition:'all 300ms'
             }}

             />}></MenuItem>




          <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
           {loginData?.userGroup == "SuperAdmin" ?
           ( <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/UsersList" />}>Users</MenuItem>):("") }
          <MenuItem icon={<i className="fa-solid fa-right-left"></i>} component={<Link to="/dashboard/RecipiesList" />}> Recipes</MenuItem>
          {loginData.userGroup== "SuperAdmin"? ( <MenuItem 
      icon={<FontAwesomeIcon icon={faList} />} 
      component={<Link to="/dashboard/CategoriesList" />}
    >
      Categories
    </MenuItem>):("")}

    {loginData.userGroup !== "SuperAdmin" && (
  <MenuItem 
    icon={<i className="fa-solid fa-heart"></i>} 
    component={<Link to="/dashboard/favorites">Favorites</Link>}
  >
    Favorites
  </MenuItem>
)}

           <MenuItem 
      icon={<FontAwesomeIcon icon={faRightFromBracket} />} 
      onClick={() => {
        localStorage.removeItem('token');
        navigate("/login");
      }}
    >
      LogOut
    </MenuItem>
        </Menu>
      </ProSidebar>
    </div>

   
  );
}