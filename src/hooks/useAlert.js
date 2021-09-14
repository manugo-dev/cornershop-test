export const useAlert = () => {
  const [isVisible, setIsVisible] = React.useState(() => false);

  const hideAlert = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const showAlert = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    hideAlert,
    showAlert
  };
};
