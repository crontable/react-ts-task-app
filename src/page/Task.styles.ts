import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

export const TaskItem = styled.li`
  list-style: none;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
  font-size: 16px;
  font-weight: 500;
`;

export const EmptyMessage = styled.div`
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
