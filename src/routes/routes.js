import Register from '../views/Register';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import { ALL, UNAUTHENTICATED } from '../utils/accountTypes';

export default {
  '/register': [Register, [UNAUTHENTICATED]],
  '/login': [Login, [UNAUTHENTICATED]],
  '/dashboard': [Dashboard, ALL],
  '/healthRecords': [Dashboard, ALL],
};
