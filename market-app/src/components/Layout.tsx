import { Link, useLocation } from 'react-router-dom';
import { Arrow } from './Arrow';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isRootPage = location.pathname === '/';
  const isPageParamPage = location.pathname.startsWith('/page/');
  const displayBack = !isRootPage && !isPageParamPage;

  return (
    <div className="container mx-auto px-0 md:px-6 lg:px-12 min-h-screen flex flex-col justify-center">
      <div className="bg-white rounded-md shadow-md flex-1 p-4 md:p-6 lg:p-12">
        {displayBack && (
          <Link to="/" className="text-indigo-500 inline-flex items-center">
            <div className="rotate-180">
              <Arrow />
            </div>{' '}
            Вернуться к списку объявлений
          </Link>
        )}
        {children}
      </div>
    </div>
  );
};

export { Layout };
