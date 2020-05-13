import React, { Suspense } from 'react';

const wrapPromise = (promise) => {
  let status = 'pending';

  let result;

  let suspender = promise
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

const fetchImages = () => {
  return new Promise((resolve) => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=apple`
    )
      .then((res) => resolve(res))
      .catch((err) => resolve(err));
  });
};

const fetchData = () => {
  const images = fetchImages();

  return {
    images: wrapPromise(images),
  };
};

const resource = fetchData();

const ImagePreview = () => {
  const images = resource.images.read();

  return images.hits.map((image) => (
    <img src={image.previewURL} alt={image.tags} key={image.id} />
  ));
};

const App = () => (
  <Suspense fallback="hello">
    <ImagePreview />
  </Suspense>
);

export default App;
