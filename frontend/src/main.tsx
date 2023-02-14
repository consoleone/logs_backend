import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, Login } from './pages';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ],
  {
    basename: '/log',
  }
);

function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen bg-gray-200'>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
