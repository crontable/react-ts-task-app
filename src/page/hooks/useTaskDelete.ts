import { useState } from 'react';
import { taskAPI } from '../../api/task.api';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../Constant';

export function useTaskDelete({ id }: { id: string }) {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  return {
    state: { deleteModalOpen, setDeleteModalOpen },
    action: { openDeleteModal, requestDeleteTask }
  };
}
