import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Notify from '../../Notify';

const notify = document.getElementById('notify');

export const notification = (objNotification: { type: string; message: string }): void => {
  const error = (message: string) => {
    ReactDOM.render(<NotificationError message={message} />, notify);
  };

  const success = (message: string) => {
    ReactDOM.render(<NotificationSuccess message={message} />, notify);
  };

  const warning = (message: string) => {
    ReactDOM.render(<NotificationWarning message={message} />, notify);
  };

  const defaultNoti = () => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const types: any = {
    error,
    success,
    warning,
    default: defaultNoti,
  };

  return (types[objNotification.type] || types['default'])(objNotification.message);
};

type TNotificationProps = { message?: string | [] };

const NotificationError: React.FC<TNotificationProps> = ({ message }) => {
  return (
    <Notify>
      <section className="absolute bottom-full animate-slide w-full h-fit-content py-10 px-14 right-0 md:w-1/2 lg:w-1/3">
        <div className="bg-red-100 text-lg py-5 px-8 text-red-900 rounded-md shadow-btn text-center">{message}!</div>
      </section>
    </Notify>
  );
};

const NotificationSuccess: React.FC<TNotificationProps> = ({ message }) => {
  return (
    <Notify>
      <section className="absolute bottom-full animate-slide w-full h-fit-content py-10 px-14 right-0 md:w-1/2 lg:w-1/3">
        <div className="bg-green-100 text-lg py-5 px-8 text-green-900 rounded-md shadow-btn text-center">{message}</div>
      </section>
    </Notify>
  );
};

const NotificationWarning: React.FC<TNotificationProps> = ({ message }) => {
  return (
    <Notify>
      <section className="absolute bottom-full animate-slide w-full h-fit-content py-10 px-14 right-0 md:w-1/2 lg:w-1/3">
        <div className="bg-yellow-100 text-lg py-5 px-8 text-yellow-900 rounded-md shadow-btn text-center">
          {message}
        </div>
      </section>
    </Notify>
  );
};

NotificationError.propTypes = { message: PropTypes.any };

NotificationSuccess.propTypes = { message: PropTypes.string };

NotificationWarning.propTypes = { message: PropTypes.string };
