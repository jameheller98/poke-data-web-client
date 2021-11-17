import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import { auth } from '../../adapters/AuthAdapter';
import { IValid } from '../../components/Input/IInput';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Tooltip from '../../components/Tooltip/Tooltip';
import { notification } from '../../components/Notification/Notification';

const initData = {
  firstName: {
    value: '',
    error: [],
  },
  lastName: {
    value: '',
    error: [],
  },
  username: {
    value: '',
    error: [],
  },
  email: {
    value: '',
    error: [],
  },
  password: {
    value: '',
    error: [],
  },
  confirmPassword: {
    value: '',
    error: [],
  },
};

const Register: React.FC = () => {
  const [loginLoaded, setLoginLoaded] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [field, setField] = useState<any>(initData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [showFieldError, setShowFieldError] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [focusInput, setFocusInput] = useState<any>({});

  useEffect(() => {
    if (auth.isLoggedIn()) {
      setShouldRedirect(true);
    }
  });

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoginLoaded(true);

    const registerRequest = {
      firstName: field.firstName.value,
      lastName: field.lastName.value,
      username: field.username.value,
      email: field.email.value,
      password: field.password.value,
      confirmPassword: field.confirmPassword.value,
    };

    auth
      .register(registerRequest)
      .then(() => {
        setShouldRedirect(true);
        notification({ type: 'success', message: 'Register success!' });
      })
      .catch((err) => {
        notification({ type: 'error', message: err.response ? err.response.data.error : 'Server not response' });
        err.response.data.errors
          ? err.response.data.errors.forEach((item: { field: string; defaultMessage: string }) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setField((field: any) => ({
                ...field,
                [item.field]: { ...field[item.field], error: [{ valid: false, message: item.defaultMessage }] },
              }));
            })
          : notification({ type: 'error', message: err.response.data.message });
        setLoginLoaded(false);
      });
  };

  if (shouldRedirect) {
    return <Redirect to="/auth/login" />;
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, validate: IValid[] | null) => {
    const target = e.target;
    const { name, value } = target;
    setField({ ...field, [name]: { value: value, error: validate } });
  };

  const validation = (name = 'default') => {
    if (
      field.firstName.error.some((item: { valid: boolean }) => item?.valid) &&
      field.lastName.error.some((item: { valid: boolean }) => item?.valid) &&
      field.username.error.some((item: { valid: boolean }) => item?.valid) &&
      field.email.error.some((item: { valid: boolean }) => item?.valid) &&
      field.password.error.some((item: { valid: boolean }) => item?.valid) &&
      field.confirmPassword.error.some((item: { valid: boolean }) => item?.valid)
    )
      return [{ valid: true, message: 'Error!' }];
    if (name === 'firstName') return field.firstName.error;
    if (name === 'lastName') return field.lastName.error;
    if (name === 'username') return field.username.error;
    if (name === 'email') return field.email.error;
    if (name === 'password') return field.password.error;
    if (name === 'confirmPassword') return field.confirmPassword.error;
    if (name === 'default') return [{ valid: false, message: 'Not error!' }];
  };

  const showField = (name: string) => {
    return setShowFieldError({ ...showFieldError, [name]: !showFieldError[name] });
  };

  const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusInput({ ...focusInput, [e.target.name]: true });
  };

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (field[e.target.name].value === '') setFocusInput({ ...focusInput, [e.target.name]: false });
  };

  return (
    <>
      <div className="p-1 md:pt-16">
        <div className="m-5 bg-gray-50 md:m-auto md:w-1/2 lg:w-1/3">
          {loginLoaded ? (
            <Form caption="Register">
              <div className="h-52 flex items-center justify-center">
                <span className="h-fit-content">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 m-auto"></div>
                </span>
              </div>
            </Form>
          ) : (
            <Form caption="Register">
              <div className="flex">
                <div className="mr-1 flex-50%">
                  <Form.Item
                    label="First name"
                    name="firstName"
                    className="flex flex-wrap relative"
                    isValue={focusInput?.firstName}
                  >
                    <Input.Text
                      className="flex-75% mt-10 md:mt-9"
                      name="firstName"
                      id="firstName"
                      value={field.firstName.value}
                      onChange={onChangeInput}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                      rules={{ required: true, notBlank: true, min: 4, max: 20 }}
                    />
                    {validation('firstName')?.some((item: { valid: boolean }) => !item.valid) ? (
                      <>
                        <ExclamationCircleIcon
                          onClick={() => showField('firstName')}
                          className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                        />
                      </>
                    ) : null}
                  </Form.Item>
                </div>
                <div className="ml-1 flex-50%">
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    className="flex flex-wrap relative"
                    isValue={focusInput?.lastName}
                  >
                    <Input.Text
                      className="flex-75% mt-10 md:mt-9"
                      name="lastName"
                      id="lastName"
                      value={field.lastName.value}
                      onChange={onChangeInput}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                      rules={{ required: true, notBlank: true, min: 4, max: 20 }}
                    />
                    {validation('lastName')?.some((item: { valid: boolean }) => !item.valid) ? (
                      <>
                        <ExclamationCircleIcon
                          onClick={() => showField('lastName')}
                          className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                        />
                      </>
                    ) : null}
                  </Form.Item>
                </div>
              </div>
              <Form.Item className={`${showFieldError.firstName || showFieldError.lastName ? 'block' : 'hidden'}`}>
                <div className={`${showFieldError.firstName ? 'block md:mt-2' : 'hidden'}`}>
                  <Tooltip validate={validation('firstName').filter((item: { valid: boolean }) => !item.valid)} />
                </div>
                <div className={`${showFieldError.lastName ? 'block md:mt-2' : 'hidden'}`}>
                  <Tooltip validate={validation('lastName').filter((item: { valid: boolean }) => !item.valid)} />
                </div>
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                className="flex flex-wrap relative"
                isValue={focusInput?.username}
              >
                <Input.Text
                  className="flex-80% mt-10 md:mt-9"
                  name="username"
                  id="username"
                  value={field.username.value}
                  onChange={onChangeInput}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                  rules={{ required: true, notBlank: true, min: 3, max: 15 }}
                />
                {validation('username')?.some((item: { valid: boolean }) => !item.valid) ? (
                  <>
                    <ExclamationCircleIcon
                      onClick={() => showField('username')}
                      className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                    />
                    <div className={`${showFieldError.username ? 'block md:mt-2' : 'hidden'}`}>
                      <Tooltip validate={validation('username')} />
                    </div>
                  </>
                ) : null}
              </Form.Item>
              <Form.Item label="Email" name="email" className="flex flex-wrap relative" isValue={focusInput?.email}>
                <Input.Text
                  className="flex-80% mt-10 md:mt-9"
                  name="email"
                  id="email"
                  value={field.email.value}
                  onChange={onChangeInput}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                  rules={{ required: true, notBlank: true }}
                />
                {validation('email')?.some((item: { valid: boolean }) => !item.valid) ? (
                  <>
                    <ExclamationCircleIcon
                      onClick={() => showField('email')}
                      className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                    />
                    <div className={`${showFieldError.email ? 'block md:mt-2' : 'hidden'}`}>
                      <Tooltip validate={validation('email')} />
                    </div>
                  </>
                ) : null}
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="flex flex-wrap relative"
                isValue={focusInput?.password}
              >
                <Input.Password
                  className="flex-80% mt-10 md:mt-9"
                  name="password"
                  id="password"
                  value={field.password.value}
                  onChange={onChangeInput}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                  rules={{
                    required: true,
                    notBlank: true,
                    min: 6,
                    max: 20,
                  }}
                />
                {validation('password')?.some((item: { valid: boolean }) => !item.valid) ? (
                  <>
                    <ExclamationCircleIcon
                      onClick={() => showField('password')}
                      className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                    />
                    <div className={`${showFieldError.password ? 'block md:mt-2' : 'hidden'}`}>
                      <Tooltip validate={validation('password')} />
                    </div>
                  </>
                ) : null}
              </Form.Item>
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                className="flex flex-wrap relative"
                isValue={focusInput?.confirmPassword}
              >
                <Input.Password
                  className="flex-80% mt-10 md:mt-9"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={field.confirmPassword.value}
                  onChange={onChangeInput}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                  rules={{
                    required: true,
                    notBlank: true,
                    min: 6,
                    max: 20,
                    matchPassword: { active: true, valueConfirm: field.password.value },
                  }}
                />
                {validation('confirmPassword')?.some((item: { valid: boolean }) => !item.valid) ? (
                  <>
                    <ExclamationCircleIcon
                      onClick={() => showField('confirmPassword')}
                      className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                    />
                    <div className={`${showFieldError.confirmPassword ? 'block md:mt-2' : 'hidden'}`}>
                      <Tooltip validate={validation('confirmPassword')} />
                    </div>
                  </>
                ) : null}
              </Form.Item>
              <Form.Item className="md:mt-4">
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={!validation()?.every((item: { valid: boolean }) => item.valid)}
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
