const LocalStorage = (() => {
  const _retrieveFromLocalStorage = (item) =>
    JSON.parse(localStorage.getItem(item));

  const _updateLocalStorage = (item, value) =>
    localStorage.setItem(item, JSON.stringify(value));

  return {
    get: (item) => _retrieveFromLocalStorage(item),
    set: (item, value) => _updateLocalStorage(item, value),
  };
})();

export default LocalStorage;
