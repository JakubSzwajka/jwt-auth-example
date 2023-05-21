import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';
import routes from './app/routes';

import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={routes}/>
    </Provider>
  </StrictMode>
);
