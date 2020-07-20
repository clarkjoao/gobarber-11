import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isField, setIsField] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  /** Use CallBack Salva a função na memoria e não re-cria */
  const handlerInputBlur = useCallback(() => {
    setIsFocus(false);

    setIsField(!!inputRef.current?.value);
  }, []);

  const handlerInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  return (
    <Container isField={isField} isFocus={isFocus}>
      {Icon && <Icon size={22} />}
      <input
        onFocus={handlerInputFocus}
        onBlur={handlerInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
