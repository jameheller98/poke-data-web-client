import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useCollapseContext } from '../../contexts/MainLayoutContext';
import './Sider.scss';

type SiderType = {
  children: JSX.Element;
};

const Sider: React.FC<SiderType> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { collapsedSider, setCollapsedSider } = useCollapseContext();

  useEffect(() => {
    document.addEventListener('click', onClickOutSide);
    return () => document.removeEventListener('click', onClickOutSide);
  });

  const onClickOutSide = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && !collapsedSider)
      setCollapsedSider(true);
  };

  return (
    <>
      <div className={`${collapsedSider ? 'sider-fade-0' : 'sider-fade'}`}>
        <div
          ref={wrapperRef}
          className={`transform ${
            collapsedSider ? 'translate-x-full' : 'translate-x-0'
          } w-screen-75 transition-all fixed h-screen right-0 top-0 bg-gray-50 z-10 border-indigo-900 border-t-4 border-opacity-90`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

Sider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Sider;
