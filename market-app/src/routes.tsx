import { createBrowserRouter } from 'react-router-dom';

import { AdvertisementsPage } from './pages/Advertisements';
import { AdvertisementPage } from './pages/Advertisement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdvertisementsPage />,
  },
  {
    path: 'advertisements/:id',
    element: <AdvertisementPage />,
  },
]);

export { router };
