import PropTypes from 'prop-types';
import { HomeIcon, LinkIcon, CubeIcon, ChevronLeftIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { NavLink, useLocation } from 'react-router-dom';
import { useCollapseContext } from '../../contexts/MainLayoutContext';
import './Menu.scss';
import React, { useContext, useEffect, useState } from 'react';

type TItem = {
  to: string;
  children: React.ReactNode;
  activeSubMenu?: boolean;
};

enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

const MenuContext = React.createContext(Direction.Vertical);

const Menu: React.FC = () => {
  const direction = useContext(MenuContext);

  return (
    <>
      <MenuContext.Provider value={direction}>
        <nav className="font-mono text-right relative">
          <div className="menu__title">MENU</div>
          <ul className="inline-block" id="menu">
            <li
              className={direction === Direction.Horizontal ? 'float-left' : 'block'}
              onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
            >
              <Item to="/about-us">
                <span className="menu__text">About us</span>
                <LinkIcon className="active__icon menu__icon" />
              </Item>
            </li>
            <li
              className={direction === Direction.Horizontal ? 'float-left' : 'block'}
              onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
            >
              <Item to="/">
                <span className="menu__text">Home</span>
                <HomeIcon className="active__icon menu__icon" />
              </Item>
            </li>

            <li className={direction === Direction.Horizontal ? 'float-left' : 'block'}>
              <SubMenu />
            </li>
            <li
              className={direction === Direction.Horizontal ? 'float-left' : 'block'}
              onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
            >
              <Item to="/contact">
                <span className="menu__text">Contact</span>
                <LinkIcon className="active__icon menu__icon" />
              </Item>
            </li>
          </ul>
        </nav>
      </MenuContext.Provider>
    </>
  );
};

const SubMenu: React.FC = () => {
  const location = useLocation();
  const { collapsedSider, setCollapsedSider } = useCollapseContext();
  const direction = useContext(MenuContext);
  const [activeSubMenu, setActiveSubMenu] = useState(false);

  useEffect(() => {
    setCollapsedSider(true);
    const menuItem = document.getElementsByClassName('sub-menu__item');
    for (let index = 0; index < menuItem.length; index++) {
      if (location.pathname === menuItem[index].getAttribute('href')) return addActiveSpan();
      document.getElementsByClassName('active__span')[0]?.remove();
    }
  }, [location]);

  useEffect(() => {
    setActiveSubMenu(false);
  }, [collapsedSider]);

  useEffect(() => {
    const activeItem = document.getElementsByClassName('col-sub-menu');

    for (let i = 0; i < activeItem.length; i++) {
      if (activeItem[i].children[0]?.classList.contains('active')) return addActiveSpan();
      document.getElementsByClassName('active__span')[0]?.remove();
    }
  }, [activeSubMenu]);

  const addActiveSpan = () => {
    const activeSubMenu = document.getElementsByClassName('active__sub')[0];
    const activeSpan = document.createElement('span');
    const animateSpan = document.createElement('span');

    document.getElementsByClassName('active__span')[0]?.remove();

    activeSpan.className = 'active__span';
    animateSpan.className = 'animate__span';
    activeSubMenu.before(activeSpan);
    activeSpan.append(animateSpan);
  };

  return (
    <>
      <span
        className={`menu__item menu__item--padding active__sub ${
          direction === Direction.Horizontal ? 'menu__item--horizontal' : 'menu__item--vertical'
        }`}
        onClick={() => setActiveSubMenu(activeSubMenu ? false : true)}
      >
        <span className="menu__text">Pokemon data</span>
        <CubeIcon className="active__icon menu__icon" />
        {activeSubMenu ? (
          <ChevronDownIcon
            className="inline-block ml-1.5 text-gray-400 text-opacity-95 pointer-events-none"
            width="24"
          />
        ) : (
          <ChevronLeftIcon
            className="inline-block ml-1.5 text-gray-400 text-opacity-95 pointer-events-none"
            width="24"
          />
        )}
      </span>
      <div className={`row-sub-menu${activeSubMenu ? ' grid' : ' hidden'}`} onClick={addActiveSpan}>
        <div className="col-sub-menu">
          <Item to="/region" activeSubMenu={true}>
            <span className="sub-menu__text">Region</span>
          </Item>
        </div>
        <div className="col-sub-menu">
          <Item to="/pokedex" activeSubMenu={true}>
            <span className="sub-menu__text">Pokedex</span>
          </Item>
        </div>
      </div>
    </>
  );
};

const Item: React.FC<TItem> = ({ to, children, activeSubMenu }) => {
  const { setCollapsedSider } = useCollapseContext();
  const direction = useContext(MenuContext);

  return (
    <>
      <NavLink
        exact
        to={to}
        activeClassName="active"
        className={`${activeSubMenu ? 'sub-menu__item menu__item--horizontal' : 'menu__item'} ${
          direction === Direction.Horizontal ? 'menu__item--horizontal' : 'menu__item--vertical'
        }`}
        onClick={() => setCollapsedSider(true)}
      >
        {children}
      </NavLink>
    </>
  );
};

Item.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  activeSubMenu: PropTypes.bool,
};

export default Menu;
