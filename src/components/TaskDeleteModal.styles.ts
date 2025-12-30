import styled from '@emotion/styled';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

export const Warning = styled.div`
  padding: 12px;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  color: #856404;
  font-size: 14px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const Button = styled.button<{ variant?: 'danger' | 'secondary' }>`
  padding: 10px 20px;
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
    &:hover:not(:disabled) {
      background-color: #c82333;
    }
    &:disabled {
      background-color: #e0e0e0;
      color: #999;
      cursor: not-allowed;
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
