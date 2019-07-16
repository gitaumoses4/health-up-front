import profile from '../../assets/images/profile.svg';
import T from '../../utils/Translation';
import health from '../../assets/images/health.svg';

export default {
  normal_user: [
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
  company: [
    {
      label: T.profile,
      link: '/dashboard',
      icon: profile,
      active: true,
    },
    {
      label: T.employees,
      link: '/employees',
    },
  ],
};
