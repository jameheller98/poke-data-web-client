import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const notify = document.getElementById('notify');

const Notify: React.FC = (props) => {
  const element = document.createElement('div');

  useEffect(() => {
    notify?.appendChild(element);
    return () => {
      notify?.removeChild(element);
    };
  });

  return ReactDOM.createPortal(props.children, element);
};

export default Notify;
