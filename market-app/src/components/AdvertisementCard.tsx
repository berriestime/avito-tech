import { Link } from 'react-router-dom';

import { Advertisment } from '../types';
import { Arrow } from './Arrow';
import { Eye } from './Eye';
import { useDeleteAdvertisementMutation } from '../api';
import { Trash } from './Trash';

type AdvertisementCardProps = {
  advertisement: Advertisment;
};

const AdvertisementCard = ({ advertisement }: AdvertisementCardProps) => {
  const [deleteAdvertisement, { isLoading }] = useDeleteAdvertisementMutation();

  const handleDelete = async () => {
    await deleteAdvertisement(advertisement.id);
  };

  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="flex flex-col h-full border-2 border-gray-200 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={
            advertisement.imageUrl ||
            'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'
          }
          alt={advertisement.name}
        />
        <div className="p-6 flex flex-col h-full">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {advertisement.name}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {advertisement.price} p
          </h1>
          <p className="leading-relaxed mb-3 line-clamp-3">
            {advertisement.description}
          </p>
          <div className="flex items-end flex-wrap flex-grow">
            <span className="text-gray-400 inline-flex items-center leading-none text-sm py-1">
              <Eye />
              {advertisement.views}
            </span>
            <Link
              to={`/advertisements/${advertisement.id}`}
              className="text-indigo-500 inline-flex items-center ml-auto"
            >
              К объявлению
              <Arrow />
            </Link>
          </div>
        </div>
        <button
          className="absolute top-0 right-0 p-2 bg-white rounded-bl-lg rounded-tr-lg bg-red-400"
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export { AdvertisementCard };
