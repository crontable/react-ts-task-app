import { AiFillDashboard } from 'react-icons/ai';
import { IoLogIn } from 'react-icons/io5';

function Header() {
  return (
    <header>
      <h1>Task app</h1>
      <ul>
        <li>
          <AiFillDashboard /> 대시보드
        </li>
        <li>
          <IoLogIn /> 로그인
        </li>
      </ul>
    </header>
  );
}

export default Header;
