import { AiFillDashboard } from 'react-icons/ai';
import { IoLogIn } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../Constant';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goToSignIn = () => {
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <header>
      <h1>Task app</h1>
      {user && <h2>안녕하세요! {user.name}님!</h2>}
      <ul>
        <li>
          <AiFillDashboard /> 대시보드
        </li>
        <li>
          {user ? (
            <button type="button" onClick={logout}>
              <IoLogIn /> 로그아웃
            </button>
          ) : (
            <button type="button" onClick={goToSignIn}>
              <IoLogIn /> 로그인
            </button>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
