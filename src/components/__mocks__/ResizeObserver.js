const ResizeObserver = () => {
  const observe = jest.fn;
  const unobserve = jest.fn;
  const disconnect = jest.fn;

  return { observe, unobserve, disconnect };
};

window.ResizeObserver = ResizeObserver;
export default ResizeObserver;

// https://stackoverflow.com/a/65095454
