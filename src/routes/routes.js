import Home from '../views/Home';
import Register from '../views/Register';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import accountTypes, { ALL, UNAUTHENTICATED } from '../utils/accountTypes';

export default {
  '/': [Home, [UNAUTHENTICATED]],
  '/register': [Register, [UNAUTHENTICATED]],
  '/login': [Login, [UNAUTHENTICATED]],
  '/dashboard': [Dashboard, ALL],
  '/healthRecords': [Dashboard, ALL],
};
