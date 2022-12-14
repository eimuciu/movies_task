import { useState } from 'react';

function useModalController() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, openModal, closeModal };
}

export default useModalController;
