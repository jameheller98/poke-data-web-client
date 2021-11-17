import PropTypes from 'prop-types';

interface ISelect {
  Option: React.FC<TSelectProps>;
}

type TSelectProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

const Select: React.FC<TSelectProps> & ISelect = ({ children, onChange, disabled }) => (
  <>
    <select className="p-3" onChange={onChange} disabled={disabled}>
      {children}
    </select>
  </>
);

export const Option: React.FC<TSelectProps> = ({ children, value }) => (
  <>
    <option value={value}>{children}</option>
  </>
);

Select.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Option.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};

Select.Option = Option;

export default Select;
