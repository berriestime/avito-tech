import { Advertisment } from '../types';
import { Eye } from './Eye';

const Advertisement: React.FC<{ advertisement: Advertisment }> = ({
  advertisement,
}) => {
  return (
    <>
      <img
        src={
          advertisement.imageUrl ||
          'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'
        }
        alt={advertisement.name}
        className="aspect-video w-full object-cover my-4"
      />
      <div className="md:flex md:flex-row-reverse">
        <div className="md:w-1/3 md:pr-4">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="text-left pr-4">Цена</th>
                <td className="text-gray-600">{advertisement.price} p</td>
              </tr>
              <tr>
                <th className="text-left align-text-top pr-4">Размещено</th>
                <td className="text-gray-600">
                  {new Date(advertisement.createdAt).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th className="text-left pr-4">Просмотров</th>
                <td className="text-gray-600 inline-flex items-center">
                  <Eye />
                  {advertisement.views}
                </td>
              </tr>
              <tr>
                <th className="text-left whitespace-nowrap pr-4">
                  В избранном
                </th>
                <td className="text-gray-600">{advertisement.likes}</td>
              </tr>
              <tr>
                <th className="text-left text-gray-400 pr-4">ID</th>
                <td className="text-gray-400">{advertisement.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="md:w-2/3 md:pl-4">
          <p className="text-gray-700 text-xl">{advertisement.description}</p>
        </div>
      </div>
    </>
  );
};

export { Advertisement };
