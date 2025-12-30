import { Modal } from './base/Modal';
import useTaskDelete from './hooks/useTaskDelete';
import * as S from './TaskDeleteModal.styles';

interface ITaskDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  onConfirm: () => void;
}

function TaskDeleteModal({ open, onOpenChange, taskId, onConfirm }: ITaskDeleteModalProps) {
  const {
    form: { register },
    state: { isMatched },
    action: { handleConfirm, handleClose }
  } = useTaskDelete({ onOpenChange, onConfirm, taskId });

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <S.ModalContent>
        <S.Title>작업 삭제 확인</S.Title>

        <S.Description>이 작업을 삭제하시겠습니까? 삭제된 작업은 복구할 수 없습니다.</S.Description>

        <S.Warning>⚠️ 삭제를 확인하려면 아래에 작업 ID를 입력해주세요.</S.Warning>

        <S.InputGroup>
          <S.Label htmlFor="task-id-input">작업 ID: {taskId}</S.Label>
          <S.Input id="task-id-input" type="text" placeholder="작업 ID를 입력하세요" {...register('taskIdInput')} />
        </S.InputGroup>

        <S.Actions>
          <S.Button variant="secondary" onClick={() => handleClose(false)}>
            취소
          </S.Button>
          <S.Button variant="danger" onClick={handleConfirm} disabled={!isMatched}>
            삭제
          </S.Button>
        </S.Actions>
      </S.ModalContent>
    </Modal>
  );
}

export default TaskDeleteModal;
