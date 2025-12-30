/* eslint-disable react-hooks/incompatible-library */
import { useForm } from 'react-hook-form';

interface IFormData {
  taskIdInput: string;
}

interface IUseTaskDeleteProps {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  taskId: string;
}

export default function useTaskDelete({ onOpenChange, onConfirm, taskId }: IUseTaskDeleteProps) {
  const { register, watch, reset } = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      taskIdInput: ''
    }
  });

  const taskIdInput = watch('taskIdInput');
  const isMatched = taskIdInput === taskId;

  const handleConfirm = () => {
    if (isMatched) {
      onConfirm();
      reset();
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  return { form: { register }, state: { isMatched }, action: { handleConfirm, handleClose } };
}
