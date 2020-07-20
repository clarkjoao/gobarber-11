import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  function handlerSubmit(data: object): void {
    console.log(data);
  }
  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="GoBarber" />
        <Form onSubmit={handlerSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a>Esqueci Minha Senha</a>
        </Form>

        <a>
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
