// src/components/Header.tsx
import { AiFillDashboard, AiOutlineUnorderedList } from 'react-icons/ai';
import { IoLogIn, IoLogOut, IoPersonCircle } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../Constant';
import * as S from './Header.styles';
import { type ComponentType } from 'react';
import { type IconBaseProps } from 'react-icons';

interface INavigationMenuItem {
  label: string;
  icon: ComponentType<IconBaseProps>;
  path: string;
}

const NAVIGATION_MENU_ITEMS: INavigationMenuItem[] = [
  {
    label: '대시보드',
    icon: AiFillDashboard,
    path: ROUTE_PATHS.DASHBOARD
  },
  {
    label: '할 일',
    icon: AiOutlineUnorderedList,
    path: ROUTE_PATHS.TASK
  }
];

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goTo = (path: string) => () => navigate(path);

  return (
    <S.HeaderContainer>
      <S.Logo onClick={goTo(ROUTE_PATHS.DASHBOARD)} style={{ cursor: 'pointer' }}>
        Task App
      </S.Logo>

      <S.Nav>
        {NAVIGATION_MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <S.NavLink key={item.path} onClick={goTo(item.path)}>
              <Icon />
              <span>{item.label}</span>
            </S.NavLink>
          );
        })}
      </S.Nav>

      <S.UserActions>
        {user ? (
          <>
            <li>
              <S.NavLink onClick={() => {}}>
                <IoPersonCircle />
                <span>{user.name}</span>
              </S.NavLink>
            </li>
            <li>
              <S.NavLink onClick={logout}>
                <IoLogOut />
                <span>로그아웃</span>
              </S.NavLink>
            </li>
          </>
        ) : (
          <li>
            <S.NavLink onClick={goTo(ROUTE_PATHS.LOGIN)}>
              <IoLogIn />
              <span>로그인</span>
            </S.NavLink>
          </li>
        )}
      </S.UserActions>
    </S.HeaderContainer>
  );
}

export default Header;
