import { Link } from 'react-router-dom';
import { Advertisment } from '../types';

const Pagination = ({
  page,
  data,
}: {
  page: number;
  data?: Advertisment[];
}) => (
  <div className="flex justify-between">
    <Link to={`/page/${page - 1}`}>
      <button
        className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
          page === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={page === 0}
      >
        &larr; Назад
      </button>
    </Link>
    <Link to={`/page/${page + 1}`}>
      <button
        className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
          (data?.length ?? 0) < 6 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={(data?.length ?? 0) < 6}
      >
        Вперед &rarr;
      </button>
    </Link>
  </div>
);

export { Pagination };
