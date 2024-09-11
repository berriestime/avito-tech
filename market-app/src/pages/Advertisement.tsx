import { Advertisement } from '../components/Advertisement';
import { Layout } from '../components/Layout';
import { useParams } from 'react-router-dom';
import { Title } from '../components/Title';
import { useGetAdvertisementByIdQuery } from '../api';

const AdvertisementPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetAdvertisementByIdQuery(id ?? '');

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error) {
    if ('status' in error) {
      return (
        <div className="h-screen flex items-center justify-center">
          Error {error.status}
        </div>
      );
    }
  }

  if (!id || !data) {
    return (
      <Layout>
        <h1>Error</h1>
        <p>Missing data</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Title>{data.name}</Title>
      <Advertisement advertisement={data} />
    </Layout>
  );
};

export { AdvertisementPage };
