import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SingInCredencials {
  email: string;
  password: string;
}

/** Iterface do Context API */
interface AuthContextData {
  signIn(credencials: SingInCredencials): Promise<void>;
}

/** Context De fato, onde irá salvar as informações */
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

/** Layout de contaxto, para que os components filhos tenham acesso aos contextos aqui criados */
export const AuthProvider: React.FC = ({ children }) => {
  /** Funcões  a serem execultadas com informações do context*/
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });
    console.log(response);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};
