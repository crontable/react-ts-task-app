import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
  color: ${(props) => props.theme.colors.primary};
`;

export const Form = styled.form``;

export const FormField = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: ${props => (props.hasError ? '1px solid red' : '1px solid #ccc')};
  border-radius: 4px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const SubmitButton = styled.button<{ isValid: boolean }>`
  width: 100%;
  padding: 12px;
  background-color: ${props => (props.isValid ? props.theme.colors.primary : props.theme.colors.disabled)};
  color: ${props => (props.isValid ? 'white' : '#666')};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${props => (props.isValid ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s;
`;

export const ApiErrorMessage = styled.p`
  color: red;
  margin-top: 16px;
  text-align: center;
  font-weight: bold;
`;
