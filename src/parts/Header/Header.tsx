import React from 'react';
import { Link } from 'react-router-dom';
import Brand from '../../components/Brand';
import CollapseButton from '../../components/CollapseButton';
import Menu from '../../components/Menu';
import useWindowSize from '../../customHooks/useWindowSize';

const Header: React.FC = React.memo(function Header() {
  const { width } = useWindowSize();
  return (
    <>
      <div className="py-2 px-6 flex items-center justify-between sm:justify-start border-indigo-900 border-t-4 border-opacity-90 shadow-md">
        <Link to="/" aria-label="Home">
          <Brand />
        </Link>
        {width > 640 ? <Menu /> : <CollapseButton size={38} />}
      </div>
    </>
  );
});
export default Header;
