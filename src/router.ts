import { createBrowserRouter } from 'react-router';

import Dashboard from './page/Dashboard';
import SignIn from './page/SignIn';
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
    path: '/sign-in',
    Component: App,
    children: [
      {
        index: true,
        Component: SignIn
      }
    ]
  }
]);

export default router;
