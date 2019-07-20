import Register from '../views/Register';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import {
  ADMINISTRATOR, ALL, COMPANY, UNAUTHENTICATED, 
} from '../utils/accountTypes';
import HealthData from '../views/HealthData';
import Employees from '../views/Employees';
import AddEmployee from '../views/AddEmployee';
import ViewEmployee from '../views/ViewEmployee';

export default {
  '/register': [Register, [UNAUTHENTICATED]],
  '/login': [Login, [UNAUTHENTICATED]],
  '/dashboard': [Dashboard, ALL],
  '/healthRecords': [HealthData, ALL],
  '/employees': [Employees, [COMPANY]],
  '/employees/new': [AddEmployee, [COMPANY]],
  '/employees/:id': [ViewEmployee, [COMPANY]],
};
