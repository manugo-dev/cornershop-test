import { useState, useCallback, useRef, useEffect } from 'react';

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

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    if (isVisible) {
      window.addEventListener('keyup', onKeyup);
    }
    return () => window.removeEventListener('keyup', onKeyup);
  }, [isVisible]);

  return {
    modalRef,
    isVisible,
    hideModal,
    showModal
  };
};

export default useModal;
