import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null);

  // Function to save login data from token
  const saveLoginData = () => {
    let encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setLoginData(decodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginData, saveLoginData, setLoginData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
