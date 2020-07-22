import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Deashboard from '../pages/Deashboard/index';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: '#312e38',
        },
      }}
    >
      <Auth.Screen name="Deashboard" component={Deashboard} />
    </Auth.Navigator>
  );
};

export default AppRoutes;
