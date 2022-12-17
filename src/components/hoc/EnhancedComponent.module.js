import withCounter from "./withCounter";

const EnhancedComponent = (() => {
  const HOC = {
    withCounter,
  };

  const getComponentDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component"; // [1]
  };

  const create = (WrappedComponent, Hoc) => {
    const EnhancedComponent = Hoc(WrappedComponent);
    EnhancedComponent.displayName = `${getComponentDisplayName(
      Hoc
    )}(${getComponentDisplayName(WrappedComponent)})`;

    return EnhancedComponent;
  };

  return {
    HOC,
    create,
  };
})();

export default EnhancedComponent;

// [1] https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
