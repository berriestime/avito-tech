import { AdvertisementList } from '../components/AdvertisementList';
import { Layout } from '../components/Layout';
import { Title } from '../components/Title';

const AdvertisementsPage = () => {
  return (
    <Layout>
      <Title>Объявления</Title>
      <AdvertisementList />
    </Layout>
  );
};

export { AdvertisementsPage };
