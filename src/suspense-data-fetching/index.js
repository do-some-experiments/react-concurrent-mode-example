import React, { Suspense } from 'react';

import { ImagePreview } from './ImagePreview';

import { fetchData } from './apiRequests';

export const resource = fetchData();

const App = () => (
  <Suspense fallback="hello">
    <ImagePreview />
  </Suspense>
);

export default App;
