import { useGetAdvertisementsQuery } from '../api';
import { AdvertisementList } from '../components/AdvertisementList';
import { Layout } from '../components/Layout';
import { Pagination } from '../components/Pagination';
import { Title } from '../components/Title';

import { useParams } from 'react-router-dom';

const AdvertisementsPage = () => {
  const { pageParam = '0' } = useParams<{ pageParam: string }>();
  const page = Number(pageParam);
  const { data, error, isLoading } = useGetAdvertisementsQuery(page);

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
    <Layout>
      <Title>Объявления</Title>
      <AdvertisementList advertisements={data} />
      <Pagination page={page} data={data} />
    </Layout>
  );
};

export { AdvertisementsPage };
