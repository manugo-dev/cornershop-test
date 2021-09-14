export const useModal = () => {
  const [isVisible, setIsVisible] = React.useState(() => false);

  const hideModal = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const showModal = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    hideModal,
    showModal
  };
};
