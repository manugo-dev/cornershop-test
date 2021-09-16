import { useState, useCallback, useRef } from 'react';
import useClickOutside from './useOutsideClick';

const useModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => false);
  useClickOutside(modalRef, () => setIsVisible(false));

  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    modalRef,
    isVisible,
    hideModal,
    showModal
  };
};

export default useModal;
