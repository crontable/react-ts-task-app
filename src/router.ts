import { createBrowserRouter } from 'react-router';

import Dashboard from './page/Dashboard';
import LogIn from './page/Login';
import App from './App';

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
    path: '/login',
    Component: LogIn
  }
]);

export default router;
