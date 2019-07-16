import T from './Translation';

const accountTypes = {
  normal_user: T.normal_user,
  company: T.company,
  admin: T.admin,
  ambulance_man: T.ambulance_man,
};

export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const ALL = Object.keys(accountTypes);

export default accountTypes;
