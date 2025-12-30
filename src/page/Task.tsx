import { useEffect } from 'react';
import { taskAPI } from '../api/task.api';

function Task() {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskAPI.fetchTasks();

        console.log('Tasks fetched successfully', tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return <div>Task</div>;
}

export default Task;
