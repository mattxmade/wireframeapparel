const fetchData = async (callback, state, atrribute, num) => {
  try {
    const response = await callback(atrribute, num);

    for (const property of Object.values(state)) {
      if (response) property(response);
    }
  } catch (error) {
    console.log("Something went wrong");
  }
};

export default fetchData;
