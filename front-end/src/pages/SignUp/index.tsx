import React from 'react';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="GoBarber" />
        <form action="">
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </form>
        <a>
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
