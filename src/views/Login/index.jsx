import AccountPageWrapper from '../../components/AccountPage';
import T from '../../utils/Translation';
import LoginForm from '../../components/LoginForm';

const Login = AccountPageWrapper({
  header: T.welcome_back,
  message: T.login_message,
  title: T.sign_in,
  form: LoginForm
});

export default Login;
