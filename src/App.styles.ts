import styled from '@emotion/styled';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const ContentContainer = styled.main`
  flex: 1;
  /* GNB의 높이만큼 패딩을 주어 콘텐츠가 가려지지 않게 합니다.
     GNB 높이가 약 65px이므로 여유있게 80px을 줍니다. */
  padding-top: 80px;
  width: 100%;
  /* max-width와 padding은 각 페이지 컴포넌트에서 관리 */
`;
