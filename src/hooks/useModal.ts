import { useState, useCallback } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(() => false);

  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    hideModal,
    showModal
  };
};

export default useModal;
