import { useContext } from 'react';
import { AuthContext } from '../HOCS/AuthProvider';

export const useAuth = () => useContext(AuthContext);