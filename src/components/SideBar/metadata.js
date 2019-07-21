import profile from '../../assets/images/profile.svg';
import T from '../../utils/Translation';
import health from '../../assets/images/health.svg';
import employees from '../../assets/images/employees.svg';
import companies from '../../assets/images/companies.svg';
import ambulances from '../../assets/images/ambulances.svg';
import dashboard from '../../assets/images/dashboard.svg';
import notifications from '../../assets/images/notifications.svg';

import {
  ADMINISTRATOR, AMBULANCE_MAN, COMPANY, NORMAL_USER, 
} from '../../utils/accountTypes';

export default {
  [NORMAL_USER]: [
    {
      label: T.my_profile,
      link: '/dashboard',
      icon: profile,
      active: true,
    },
    {
      label: T.health_records,
      icon: health,
      link: '/healthRecords',
    },
  ],
  [COMPANY]: [
    {
      label: T.profile,
      link: '/dashboard',
      icon: profile,
      active: true,
    },
    {
      label: T.employees,
      link: '/employees',
      icon: employees,
    },
  ],
  [ADMINISTRATOR]: [
    {
      label: T.companies,
      link: '/companies',
      icon: companies,
      active: true,
    },
    {
      label: T.ambulances,
      link: '/ambulances',
      icon: ambulances,
    },
    {
      label: T.notifications,
      link: '/builder/notifications',
      icon: notifications,
    },
  ],
  [AMBULANCE_MAN]: [
    {
      label: T.dashboard,
      link: '/dashboard',
      icon: dashboard,
      active: true,
    },
  ],
};
