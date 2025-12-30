import { TaskCard } from '../components/TaskCard';
import useTask from './hooks/useTask';
import * as S from './Task.styles';

function Task() {
  const {
    state: { tasks, error },
    action: { goToDashboard, goToTaskDetail }
  } = useTask();

  if (error) {
    return (
      <S.Container>
        <S.ErrorMessage>{error}</S.ErrorMessage>
        <S.Actions>
          <S.Button onClick={goToDashboard}>대시보드로 돌아가기</S.Button>
        </S.Actions>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>할 일 목록</S.Title>
      {tasks.length === 0 ? (
        <S.EmptyMessage>등록된 할 일이 없습니다.</S.EmptyMessage>
      ) : (
        <S.TaskList>
          {tasks.map((task) => (
            <S.TaskItem key={task.id}>
              <TaskCard task={task} onClick={() => goToTaskDetail(task.id)} />
            </S.TaskItem>
          ))}
        </S.TaskList>
      )}
    </S.Container>
  );
}

export default Task;
