import { useNavigate, useParams } from 'react-router';
import * as S from './TaskDetail.styles';
import { ROUTE_PATHS } from '../Constant';
import TaskDeleteModal from '../components/TaskDeleteModal';
import useTaskDetail from './hooks/useTaskDetail';
import { useTaskDelete } from './hooks/useTaskDelete';

function TaskDetail() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(ROUTE_PATHS.TASK);
  };

  const {
    state: { task, error }
  } = useTaskDetail({ id: id! });

  const {
    state: { deleteModalOpen, setDeleteModalOpen },
    action: { openDeleteModal, requestDeleteTask }
  } = useTaskDelete({ id: id! });

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
        <S.LoadingMessage>불러오는 중...</S.LoadingMessage>
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
