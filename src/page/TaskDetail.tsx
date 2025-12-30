import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { ITaskDetailResponse } from '../Types';
import { taskAPI } from '../api/task.api';
import { AxiosError } from 'axios';
import * as S from './TaskDetail.styles';
import { ROUTE_PATHS } from '../Constant';
import TaskDeleteModal from '../components/TaskDeleteModal';

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<ITaskDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchTaskDetail = async (taskId: string) => {
      try {
        const taskDetail = await taskAPI.fetchTaskDetail(taskId);
        setTask(taskDetail);

        console.log('Fetching details for task ID:', taskId);
      } catch (error) {
        if (error instanceof AxiosError && error.status === 404) {
          setError('존재하지 않는 작업입니다.');
        }
      }
    };

    fetchTaskDetail(id!);
  }, [id]);

  const goBack = () => {
    navigate(ROUTE_PATHS.TASK);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    console.log('Delete task:', id);
  };

  const requestDeleteTask = async () => {
    try {
      await taskAPI.deleteTask(id!);

      navigate(ROUTE_PATHS.TASK);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (error) {
    return (
      <S.Container>
        <S.ErrorMessage>{error}</S.ErrorMessage>
        <S.Actions>
          <S.Button onClick={goBack}>목록으로 돌아가기</S.Button>
        </S.Actions>
      </S.Container>
    );
  }

  if (!task) {
    return (
      <S.Container>
        <S.LoadingMessage>로딩 중...</S.LoadingMessage>
      </S.Container>
    );
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>{task.title}</S.Title>
          <S.MetaInfo>
            <S.RegisterDate>📅 등록일: {new Date(task.registerDateTime).toLocaleDateString('ko-KR')}</S.RegisterDate>
          </S.MetaInfo>
        </S.Header>

        <S.Content>
          <S.Label>메모</S.Label>
          <S.Memo>{task.memo}</S.Memo>
        </S.Content>

        <S.Actions>
          <S.Button onClick={goBack}>목록으로</S.Button>
          <S.Button variant="danger" onClick={openDeleteModal}>
            삭제
          </S.Button>
        </S.Actions>
      </S.Container>

      <TaskDeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        taskId={id!}
        onConfirm={requestDeleteTask}
      />
    </>
  );
}

export default TaskDetail;
