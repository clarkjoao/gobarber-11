import React from 'react';

import { Container } from './styles';

interface ToltipProps {
  title: string;
  className?: string;
}
const Toltip: React.FC<ToltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  );
};

export default Toltip;
