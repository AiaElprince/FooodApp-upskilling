import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  let { loginData } = useContext(AuthContext);
  if (loginData) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
ProtectedRoute.propTypes = {
  loginData: PropTypes.any,
  children: PropTypes.node.isRequired,
};
