export const showErrorMessage = (error: Error) => {
  window.alert(`Ups, smth went wrong ... Our server said "${error.message}"`);
};
