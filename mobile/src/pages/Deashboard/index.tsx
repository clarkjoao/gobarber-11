import React from 'react';
import { View, Button, Text } from 'react-native';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Deashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Button title="sair" onPress={signOut}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};

export default Deashboard;
