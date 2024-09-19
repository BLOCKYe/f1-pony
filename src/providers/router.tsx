import routes from '@/constants/routes';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/modules/home/pages/HomePage';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <HomePage />,
  },
]);

export default router;
