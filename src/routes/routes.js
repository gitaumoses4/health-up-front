import Register from '../views/Register';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import {
  ADMINISTRATOR, ALL, AMBULANCE_MAN, COMPANY, UNAUTHENTICATED,
} from '../utils/accountTypes';
import HealthData from '../views/HealthData';
import Employees from '../views/Employees';
import AddEmployee from '../views/AddEmployee';
import ViewEmployee from '../views/ViewEmployee';
import ViewCompany from '../views/ViewCompany';
import Ambulances from '../views/Ambulances';
import AddAmbulanceMan from '../views/AddAmbulanceMan';
import NotificationBuilder from '../views/NotificationBuilder';
import NotificationTypeBuilder from '../views/NotificationTypeBuilder';
import Notifications from '../views/Notifications';
import AmbulanceLogin from '../views/AmbulanceLogin';

export default {
  '/register': [Register, [UNAUTHENTICATED]],
  '/login': [Login, [UNAUTHENTICATED]],
  '/login/ambulance': [AmbulanceLogin, [UNAUTHENTICATED]],
  '/dashboard': [Dashboard, ALL],
  '/healthRecords': [HealthData, ALL],
  '/employees': [Employees, [COMPANY]],
  '/employees/new': [AddEmployee, [COMPANY]],
  '/employees/:id': [ViewEmployee, [COMPANY, ADMINISTRATOR, AMBULANCE_MAN]],
  '/companies': [Dashboard, [ADMINISTRATOR]],
  '/companies/:id': [ViewCompany, [ADMINISTRATOR]],
  '/ambulances': [Ambulances, [ADMINISTRATOR]],
  '/ambulances/new': [AddAmbulanceMan, [ADMINISTRATOR]],
  '/builder/notifications': [NotificationBuilder, [ADMINISTRATOR]],
  '/builder/notifications/:id': [NotificationTypeBuilder, [ADMINISTRATOR]],
  '/notifications': [Notifications, ALL],
};
