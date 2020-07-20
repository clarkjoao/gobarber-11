import React from 'react';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp/index';
import ToastContainer from './components/ToastContainer/index';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
};

export default App;
