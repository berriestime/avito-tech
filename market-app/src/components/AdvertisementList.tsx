import { Advertisment } from '../types';
import { AdvertisementCard } from './AdvertisementCard';

const AdvertisementList = ({
  advertisements = [],
}: {
  advertisements?: Advertisment[];
}) => {
  if (advertisements.length === 0) {
    return <p className="text-center">На этой странице нет объявлений</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {advertisements.map((advertisement) => (
        <AdvertisementCard
          key={advertisement.id}
          advertisement={advertisement}
        />
      ))}
    </div>
  );
};

export { AdvertisementList };
