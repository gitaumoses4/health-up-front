export default (error) => {
  const { response } = error;
  const data = response ? response.data : {};

  return {
    message: response ? data.message: 'Something went wrong. Please try again!',
    errors: response ? data.errors : []
  };
};
