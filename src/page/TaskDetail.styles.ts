import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #e0e0e0;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: #333;
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  color: #666;
  font-size: 14px;
`;

export const RegisterDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Content = styled.div`
  margin-bottom: 40px;
`;

export const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #555;
`;

export const Memo = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #007bff;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === 'danger'
      ? `
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  `
      : `
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  `}
`;

export const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  color: #721c24;
  text-align: center;
  font-size: 16px;
`;

export const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;
  font-size: 16px;
`;
