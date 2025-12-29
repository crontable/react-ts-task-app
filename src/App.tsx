import { Outlet } from 'react-router';
import Header from './components/Header';
import * as S from './App.styles';

function App() {
  return (
    <S.AppContainer>
      <Header />
      <S.ContentContainer>
        <Outlet />
      </S.ContentContainer>
    </S.AppContainer>
  );
}

export default App;