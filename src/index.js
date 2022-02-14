import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Spinner from './components/Spinner';
import reportWebVitals from './reportWebVitals';
const Filter = React.lazy(() => import('./components/Filter'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <Filter />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
