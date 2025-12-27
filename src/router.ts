import { createBrowserRouter } from 'react-router';

import Dashboard from './page/Dashboard';
import LogIn from './page/LogIn';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Dashboard
  },
  {
    path: '/login',
    Component: LogIn
  }
]);

export default router;
