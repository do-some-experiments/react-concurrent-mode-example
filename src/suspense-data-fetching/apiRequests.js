import { wrapPromise } from './wrapPromise';

const fetchImages = () => {
  return new Promise((resolve) => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=apple`
    )
      .then((res) => resolve(res))
      .catch((err) => resolve(err));
  });
};

export const fetchData = () => {
  const images = fetchImages();

  return {
    images: wrapPromise(images),
  };
};
