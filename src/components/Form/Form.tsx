import PropTypes from 'prop-types';
import React, { Validator } from 'react';

interface IForm {
  Item: React.FC<TFormItem>;
}

type TForm = {
  children: JSX.Element[] | JSX.Element;
  caption: string;
};

const Form: React.FC<TForm> & IForm = ({ caption, children }) => (
  <>
    <form className="py-7 px-5 text-lg text-gray-700 shadow-md rounded-md md:text-base">
      <div className="text-center font-semibold text-2xl text-gray-800 mt-1 mb-6 tracking-wide md:tracking-normal">
        {caption}
      </div>
      <hr />
      {children}
    </form>
  </>
);

Form.propTypes = {
  children: PropTypes.oneOfType<Validator<JSX.Element> | Validator<JSX.Element[]>>([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  ]).isRequired,
  caption: PropTypes.string.isRequired,
};

type TFormItem = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  name?: string;
  isValue?: boolean;
};

const FormItem: React.FC<TFormItem> = ({ label, children, className, name, isValue }) => (
  <>
    <FormItemInput label={label} className={className}>
      {label ? <FormItemLabel label={label} name={name} isValue={isValue} /> : null}
      {children}
    </FormItemInput>
  </>
);

FormItem.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  isValue: PropTypes.bool,
};

type TFormItemLabel = {
  label?: string;
  name?: string;
  isValue?: boolean;
};

const FormItemLabel: React.FC<TFormItemLabel> = ({ label, name, isValue }) => (
  <>
    <label
      title={label}
      className={`absolute cursor-text transition-all${
        isValue
          ? ` -top-2 ml-0 opacity-100 font-semibold tracking-wide md:tracking-normal`
          : ` top-4 my-2 py-2 ml-4 opacity-70 md:my-1`
      }`}
      htmlFor={name}
    >
      <span className="inline-block mt-4">{label}</span>
    </label>
  </>
);

FormItemLabel.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  isValue: PropTypes.bool,
};

const FormItemInput: React.FC<TFormItem> = ({ children, label, className }) => (
  <>
    <div className={`${label ? '' : 'my-1 py-1'}${className ? ' ' + className : ''}`}>{children}</div>
  </>
);

FormItemInput.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

Form.Item = FormItem;

export default Form;
