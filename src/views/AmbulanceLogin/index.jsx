import AccountPageWrapper from '../../components/AccountPage';
import T from '../../utils/Translation';
import LoginForm from '../../components/Forms/LoginForm';
import { AMBULANCE_MAN } from '../../utils/accountTypes';

const AmbulanceLogin = AccountPageWrapper({
  header: T.welcome_back,
  message: T.login_message,
  title: T.ambulance_login,
  form: LoginForm(AMBULANCE_MAN),
});


export default AmbulanceLogin;
