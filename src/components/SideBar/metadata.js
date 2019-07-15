import accountTypes from '../../utils/accountTypes';

export default {
  [accountTypes.normal_user]: [
    {
      label: 'My Profile',
      link: '/dashboard',
      active: true,
    },
    {
      label: 'Health Records',
      link: '/healthRecords',
    },
  ],
  [accountTypes.company]: [
    {
      label: 'Profile',
      link: '/dashboard',
      active: true,
    },
    {
      label: 'Employees',
      link: '/employees',
    },
  ],
};
