import PropTypes from 'prop-types';
import React from 'react';
import { IMatchPassword, IRules, IValid } from './IInput';

type TRule = IMatchPassword | boolean | number;

const validate = (type: string, isRule: TRule, value = '', name = '') => {
  let valid = true,
    message = 'Field valid.';

  const isRequired = (value: string) => {
    if (value === '' && isRule) {
      valid = false;
      message = 'Field ' + name.toLowerCase() + ' is required!';
    }
  };

  const isBlank = (value: string) => {
    if (value.match(/\s/) && isRule) {
      valid = false;
      message = 'Field ' + name.toLocaleLowerCase() + " shouldn't have whitespaces!";
    }
  };

  const isMin = (value: string) => {
    if (value.length < isRule) {
      valid = false;
      message = 'Field ' + name.toLocaleLowerCase() + ' should greater than 4!';
    }
  };

  const isMax = (value: string) => {
    if (value.length > isRule) {
      valid = false;
      message = 'Field ' + name.toLocaleLowerCase() + ' should less than 20!';
    }
  };

  const isMatchPassword = (value: string) => {
    const rule = isRule as IMatchPassword;
    if (value !== rule.valueConfirm) {
      valid = false;
      message = 'Field ' + name.toLocaleLowerCase() + ' not match password!';
    }
  };

  const defaultValid = () => {
    return valid;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const valids: any = {
    required: isRequired,
    notBlank: isBlank,
    min: isMin,
    max: isMax,
    matchPassword: isMatchPassword,
    default: defaultValid,
  };

  (valids[type] || valids['default'])(value);

  return { valid, message };
};

const handleOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  funcOnChnage: ((e: React.ChangeEvent<HTMLInputElement>, validate: IValid[]) => void) | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: IRules[] | undefined | any,
) => {
  const resValid = [];
  if (rules) {
    for (const rule of Object.keys(rules)) {
      const findSameValid = resValid.findIndex(
        (item) => item.message === validate(rule, rules[rule], e.target.value).message,
      );

      if (findSameValid < 0 && !validate(rule, rules[rule], e.target.value).valid) {
        resValid.push(validate(rule, rules[rule], e.target.value, e.target.name));
      }
    }
    if (resValid.length === 0) resValid.push(validate('default', false));
  }

  if (funcOnChnage) return funcOnChnage(e, resValid);
};

type IInput = {
  Text: React.FC<TInput>;
  Password: React.FC<TInput>;
};

type TInput = {
  name: string;
  id?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, validate: IValid[]) => void;
  rules?: IRules;
  value?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC & IInput = (props) => {
  return <>{props.children}</>;
};

const InputText: React.FC<TInput> = ({
  name,
  id,
  placeholder,
  onChange,
  rules,
  value,
  className,
  onClick,
  onFocus,
  onBlur,
}) => {
  return (
    <>
      <input
        className={`block w-full rounded-md shadow-inner bg-gray-50 my-2 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent md:my-0${
          className ? ' ' + className : ''
        }`}
        name={name}
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e, onChange, rules)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
      />
    </>
  );
};

const InputPassword: React.FC<TInput> = ({
  name,
  id,
  placeholder,
  onChange,
  rules,
  value,
  className,
  onClick,
  onFocus,
  onBlur,
}) => {
  return (
    <>
      <input
        className={`block w-full rounded-md shadow-inner bg-gray-50 my-2 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent md:my-0${
          className ? ' ' + className : ''
        }`}
        name={name}
        id={id}
        type="password"
        autoComplete="on"
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e, onChange, rules)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
      />
    </>
  );
};

Input.propTypes = {
  children: PropTypes.node.isRequired,
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  rules: PropTypes.any,
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

InputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  rules: PropTypes.any,
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.Text = InputText;
Input.Password = InputPassword;

export default Input;
