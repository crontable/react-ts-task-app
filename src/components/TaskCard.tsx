import type { ITaskResponse } from '../Types';
import * as S from './TaskCard.styles';

interface TaskCardProps {
  task: ITaskResponse;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <S.Card onClick={onClick}>
      <S.Header>
        <S.Title>{task.title}</S.Title>
        <S.StatusBadge status={task.status}>{task.status === 'TODO' ? '해야할 일' : '완료'}</S.StatusBadge>
      </S.Header>
      <S.Memo>{task.memo}</S.Memo>
    </S.Card>
  );
}
