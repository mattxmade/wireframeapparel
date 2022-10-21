const capitaliseString = (string) => {
  const stringToProcess = string;
  return stringToProcess.slice(0, 1).toUpperCase() + stringToProcess.slice(1);
};

export default capitaliseString;
