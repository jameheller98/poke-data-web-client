import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../adapters/AuthAdapter';
import { logoutCurrentUser } from './AuthSlice';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutCurrentUser);
  });
  auth.logout();
  return <Redirect to="/auth/login" />;
};

export default Logout;
