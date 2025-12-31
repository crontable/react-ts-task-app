import useProfile from './hooks/useProfile';
import * as S from './Profile.styles';

function Profile() {
  const {
    state: { user, error, isLoading }
  } = useProfile();

  if (error) {
    return (
      <S.Container>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Container>
    );
  }

  if (isLoading || !user) {
    return (
      <S.Container>
        <S.LoadingMessage>불러오는 중...</S.LoadingMessage>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>회원 정보</S.Title>
          <S.Subtitle>내 계정 정보를 확인할 수 있습니다</S.Subtitle>
        </S.Header>

        <S.ProfileSection>
          <S.Label>이름</S.Label>
          <S.Value>{user.name}</S.Value>
        </S.ProfileSection>

        <S.ProfileSection>
          <S.Label>메모</S.Label>
          <S.MemoValue>{user.memo ? user.memo : <S.EmptyMemo>작성된 메모가 없습니다</S.EmptyMemo>}</S.MemoValue>
        </S.ProfileSection>
      </S.Card>
    </S.Container>
  );
}

export default Profile;
