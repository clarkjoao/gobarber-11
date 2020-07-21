import React from 'react';
import GlobalStyle from './styles/global';
import { BrowserRouter as Route } from 'react-router-dom';
import AppHooks from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <Route>
      <AppHooks>
        <Routes />
      </AppHooks>
      <GlobalStyle />
    </Route>
  );
};

export default App;
