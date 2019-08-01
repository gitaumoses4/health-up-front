
const resources = {
  register: {
    endpoint: '/register',
  },
  login: {
    endpoint: '/login',
  },
  ambulanceLogin: {
    endpoint: '/login/ambulance',
  },
  user: {
    endpoint: '/user',
  },
  userProfile: {
    endpoint: '/profile',
  },
  healthData: {
    endpoint: '/healthInformation',
  },
  companyProfile: {
    endpoint: '/company',
  },
  updatePassword: {
    endpoint: '/updatePassword',
  },
  employees: {
    endpoint: '/company/employees',
  },
  userInformation: {
  },
  companies: {
    endpoint: '/companies',
  },
  companyInformation: {
  },
  ambulances: {
    endpoint: '/ambulances',
  },
  searchUsers: {
    endpoint: '/users',
  },
  notificationTypes: {
    endpoint: '/notificationBuilder/types',
  },
  notificationType: {
    endpoint: '/notificationBuilder/types/:id',
  },
  notifications: {
    endpoint: '/notifications',
    list: true,
    resolveList: data => data.notifications,
    resolveUpdate: (item, newItem) => item.id === newItem.notification.id,
    resolveSingle: data => data.notification,
  },
  forgotPassword: {
    endpoint: '/users/forgotPassword',
  },
  resetPassword: {
    endpoint: '/users/resetPassword',
  },
};

export default resources;
