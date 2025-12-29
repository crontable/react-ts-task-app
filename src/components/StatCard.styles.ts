import styled from '@emotion/styled';

export const Card = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
`;

export const Label = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

export const Value = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;
