import { useGetAdvertisementsQuery } from '../api/advertisement';
import { AdvertisementCard } from './AdvertisementCard';

const AdvertisementList = () => {
  const { data, error, isLoading } = useGetAdvertisementsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ('status' in error) {
      return <div>Error {error.status}</div>;
    }

    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((advertisement) => (
        <AdvertisementCard
          key={advertisement.id}
          advertisement={advertisement}
        />
      ))}
    </div>
  );
};

export { AdvertisementList };
