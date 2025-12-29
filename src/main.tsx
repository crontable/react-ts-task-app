import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');

  return worker.start();
}

const root = createRoot(document.getElementById('root')!);

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
});
