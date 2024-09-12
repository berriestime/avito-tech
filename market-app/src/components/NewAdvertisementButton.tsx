import { useState } from 'react';

import { Modal, ModalBody, ModalFooter, ModalHeader } from './Modal';

import { useCreateAdvertisementMutation } from '../api/advertisement';
import { Advertisment } from '../types';
import { useNavigate } from 'react-router-dom';

type NewAdvertisementForm = Omit<
  Advertisment,
  'id' | 'createdAt' | 'views' | 'likes'
>;

const NewAdvertisementButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<NewAdvertisementForm>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });
  const navigate = useNavigate();

  const [createAdvertisement, { isLoading }] = useCreateAdvertisementMutation();

  const handleChange =
    (key: keyof NewAdvertisementForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await createAdvertisement(form);
      setIsOpen(false);
      if (!data) return;
      navigate(`/advertisements/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Создать новое объявление
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Создать новое объявление</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Название
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Описание
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                value={form.description}
                onChange={handleChange('description')}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Цена
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                value={form.price}
                onChange={handleChange('price')}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imageUrl"
              >
                Ссылка на изображение
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={handleChange('imageUrl')}
              />
            </div>
            <ModalFooter>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isLoading}
              >
                Создать
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export { NewAdvertisementButton };
