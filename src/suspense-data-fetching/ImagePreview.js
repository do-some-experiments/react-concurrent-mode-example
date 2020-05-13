import React from 'react';

import { resource } from '.';

export const ImagePreview = () => {
  const images = resource.images.read();

  return images.hits.map((image) => (
    <img src={image.previewURL} alt={image.tags} key={image.id} />
  ));
};
