import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f0f0f0;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #333;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

export const ProfileSection = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

export const Value = styled.div`
  font-size: 16px;
  color: #212529;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;

export const MemoValue = styled(Value)`
  min-height: 120px;
  white-space: pre-wrap;
`;

export const EmptyMemo = styled.div`
  color: #adb5bd;
  font-style: italic;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
  font-size: 16px;
  font-weight: 500;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 16px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
  }

  &:active {
    transform: scale(0.98);
  }
`;
