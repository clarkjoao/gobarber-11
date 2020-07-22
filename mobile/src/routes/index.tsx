import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#312e38',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
