import React from 'react';
import { View, Image } from 'react-native';

import { Container } from './styles';
import Logo from '../../assets/logo.png';
const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={Logo} />
    </Container>
  );
};

export default SignIn;
