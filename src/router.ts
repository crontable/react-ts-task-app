import { createBrowserRouter } from 'react-router';

import Dashboard from './page/Dashboard';
import SignIn from './page/SignIn';
import App from './App';
import Task from './page/Task';
import TaskDetail from './page/TaskDetail';
import Profile from './page/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Dashboard
      }
    ]
  },
  {
    path: '/sign-in',
    Component: App,
    children: [
      {
        index: true,
        Component: SignIn
      }
    ]
  },
  {
    path: '/task',
    Component: App,
    children: [
      {
        index: true,
        Component: Task
      },
      {
        path: ':id',
        Component: TaskDetail
      }
    ]
  },
  {
    path: '/profile',
    Component: App,
    children: [
      {
        index: true,
        Component: Profile
      }
    ]
  }
]);

export default router;
