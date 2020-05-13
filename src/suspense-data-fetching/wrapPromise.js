export const wrapPromise = (promise) => {
  let status = 'pending';

  let result;

  const suspender = promise
    .then((res) => res.json())
    .then((data) => {
      status = 'success';
      result = data;
    })
    .catch((err) => {
      status = 'error';
      result = err;
    });

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};
