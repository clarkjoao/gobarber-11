import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SingInCredencials {
  email: string;
  password: string;
}

/** Iterface do Context API */
interface AuthContextData {
  user: object;
  isLoading: boolean;
  signIn(credencials: SingInCredencials): Promise<void>;
  signOut(): void;
}

/** Context De fato, onde irá salvar as informações */
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

/** Layout de contaxto, para que os components filhos tenham acesso aos contextos aqui criados */
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCredencials(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setIsLoading(false);
    }

    getCredencials();
  }, []);

  /** Funcões  a serem execultadas com informações do context*/
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { user, token } = response?.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** Hook Api, para não ficar importando o Contexto em Todas as telas */
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  /** Verifica se há contexto, ou seja, se a tela perminte utilizar esse contexto, sem passar o auth por fora*/
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
