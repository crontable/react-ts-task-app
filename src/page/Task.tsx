import { useEffect, useState } from 'react';
import { taskAPI } from '../api/task.api';
import type { ITaskResponse } from '../Types';
import { TaskCard } from '../components/TaskCard';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../Constant';
import * as S from './Task.styles';

function Task() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<ITaskResponse[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskAPI.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <S.Container>
      <S.Title>할 일 목록</S.Title>
      <S.TaskList>
        {tasks.map((task) => (
          <S.TaskItem key={task.id}>
            <TaskCard task={task} onClick={() => navigate(`${API_ENDPOINTS.TASK}/${task.id}`)} />
          </S.TaskItem>
        ))}
      </S.TaskList>
    </S.Container>
  );
}

export default Task;
