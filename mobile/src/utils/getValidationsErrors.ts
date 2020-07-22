import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}
/** Essa Função remove os erros do Array de erros do Yup e transforma em um Objeto */
export default function getValidationsErrors(err: ValidationError): Erros {
  // Objeto array, tipado com a interface
  const ValidationErros: Erros = {};
  //Foreach
  err.inner.forEach(erro => {
    ValidationErros[erro.path] = erro.message;
  });
  //retorno do objeto
  return ValidationErros;
}
