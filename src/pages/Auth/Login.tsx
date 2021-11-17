import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { auth } from '../../adapters/AuthAdapter';
import { IValid } from '../../components/Input/IInput';
import { notification } from '../../components/Notification/Notification';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './AuthSlice';

const initData = {
  usernameOrEmail: {
    value: '',
    error: [],
  },
  password: {
    value: '',
    error: [],
  },
};

const Login: React.FC = () => {
  const location: { state: { from: { pathname: string } } } = useLocation();
  const [loginLoaded, setLoginLoaded] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [field, setField] = useState<any>(initData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [showFieldError, setShowFieldError] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [focusInput, setFocusInput] = useState<any>({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn()) {
      setShouldRedirect(true);
    }
  });

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoginLoaded(true);

    const loginRequest = {
      usernameOrEmail: field.usernameOrEmail.value,
      password: field.password.value,
    };

    auth
      .login(loginRequest)
      .then(() => {
        setShouldRedirect(true);
        notification({ type: 'success', message: 'Login success!' });
        dispatch(fetchCurrentUser);
      })
      .catch((err) => {
        notification({ type: 'error', message: err.response ? err.response.data.error : 'Server not response' });
        setLoginLoaded(false);
      });
  };

  const redirectPath = () => {
    const locationState = location.state;
    const pathname = locationState?.from?.pathname;
    return pathname || '/home';
  };

  if (shouldRedirect) {
    return <Redirect to={redirectPath()} />;
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, validate: IValid[] | null) => {
    const target = e.target;
    const { name, value } = target;
    setField({ ...field, [name]: { value: value, error: validate } });
  };

  const validation = (name = 'default') => {
    if (
      field.usernameOrEmail.error.some((item: { valid: boolean }) => item?.valid) &&
      field.password.error.some((item: { valid: boolean }) => item?.valid)
    )
      return [{ valid: true, message: 'Error!' }];
    if (name === 'usernameOrEmail') return field.usernameOrEmail.error;
    if (name === 'password') return field.password.error;
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
            <Form caption="Login">
              <div className="h-52 flex items-center justify-center">
                <span className="h-fit-content">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 m-auto"></div>
                </span>
              </div>
            </Form>
          ) : (
            <Form caption="Login">
              <Form.Item
                label="Username or Email"
                name="usernameOrEmail"
                className="flex flex-wrap relative"
                isValue={focusInput?.usernameOrEmail}
              >
                <Input.Text
                  className="flex-80% mt-10 md:mt-9"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  value={field.usernameOrEmail.value}
                  onChange={onChangeInput}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                  rules={{ required: true, notBlank: true }}
                />
                {validation('usernameOrEmail')?.some((item: { valid: boolean }) => !item.valid) ? (
                  <>
                    <ExclamationCircleIcon
                      onClick={() => showField('usernameOrEmail')}
                      className="w-7 text-red-500 opacity-75 ml-2 mt-7 md:mt-9 md:w-6"
                    />
                    <div className={`${showFieldError.usernameOrEmail ? 'block md:mt-2' : 'hidden'}`}>
                      <Tooltip validate={validation('usernameOrEmail')} />
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
                  rules={{ required: true, notBlank: true }}
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
              <Form.Item className="md:mt-4">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!validation()?.every((item: { valid: boolean }) => item.valid)}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
