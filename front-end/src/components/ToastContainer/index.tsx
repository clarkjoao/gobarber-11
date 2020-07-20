import React from 'react';

import { Container, Toast } from './styles';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast>
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um error</strong>
          <p>não foi possivel fazer login na aplicação</p>
          <button>
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
