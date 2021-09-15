import { useState, useCallback } from 'react';

const useAlert = () => {
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

export default useAlert;
