import styled from '@emotion/styled';

export const Card = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  box-sizing: border-box;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export const StatusBadge = styled.span<{ status: 'TODO' | 'DONE' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (props.status === 'TODO' ? '#ffeaa7' : '#55efc4')};
  color: ${(props) => (props.status === 'TODO' ? '#d63031' : '#00b894')};
`;

export const Memo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;
