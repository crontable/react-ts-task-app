import { createBrowserRouter } from 'react-router';

import Dashboard from './page/Dashboard';
import SignIn from './page/SignIn';
import App from './App';
import Task from './page/Task';

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
      }
    ]
  }
]);

export default router;
