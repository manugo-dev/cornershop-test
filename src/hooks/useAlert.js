import { useState, useCallback } from 'react';

export const useAlert = () => {
  const [isVisible, setIsVisible] = useState(() => false);

  const hideAlert = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showAlert = useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    hideAlert,
    showAlert
  };
};
