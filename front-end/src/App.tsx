import React from 'react';
import GlobalStyle from './styles/global';

import AppHooks from './hooks';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp/index';

const App: React.FC = () => {
  return (
    <>
      <AppHooks>
        <SignIn />
      </AppHooks>
      <GlobalStyle />
    </>
  );
};

export default App;
