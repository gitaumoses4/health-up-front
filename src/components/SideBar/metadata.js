import accountTypes from '../../utils/accountTypes';
import profile from '../../assets/images/profile.svg';
import health from '../../assets/images/health.svg';

export default {
  [accountTypes.normal_user]: [
    {
      label: 'My Profile',
      link: '/dashboard',
      icon: profile,
      active: true,
    },
    {
      label: 'Health Records',
      icon: health,
      link: '/healthRecords',
    },
  ],
  [accountTypes.company]: [
    {
      label: 'Profile',
      link: '/dashboard',
      icon: profile,
      active: true,
    },
    {
      label: 'Employees',
      link: '/employees',
    },
  ],
};
