import PropTypes from 'prop-types';
import {
  HomeIcon,
  LinkIcon,
  CubeIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  LoginIcon,
  PlusIcon,
  CollectionIcon,
} from '@heroicons/react/solid';
import { NavLink, useLocation } from 'react-router-dom';
import { useCollapseContext } from '../../contexts/MainLayoutContext';
import './Menu.scss';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../customHooks/useWindowSize';
import { auth } from '../../adapters/AuthAdapter';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../pages/Auth/AuthSlice';

type TItem = {
  to: string;
  children: React.ReactNode;
  activeSubMenu?: boolean;
};

export enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

const Menu: React.FC = () => {
  const { width } = useWindowSize();
  const direction = width > 640 ? Direction.Horizontal : Direction.Vertical;
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <nav className="font-mono text-right relative sm:py-2 sm:pl-5">
        {width > 640 ? null : <h1 className="menu__title">MENU</h1>}
        <ul className="inline-block sm:flex sm:gap-2 sm:flex-wrap" id="menu">
          <li
            className={direction === Direction.Horizontal ? 'float-left' : 'block'}
            onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
          >
            <Item to="/about-us">
              <span className="menu__text sm:text-base">About</span>
              <InformationCircleIcon className="active__icon menu__icon icon__private" />
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
          <li
            className={direction === Direction.Horizontal ? 'float-left' : 'block'}
            onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
          >
            <Item to="/builder">
              <span className="menu__text">Builder</span>
              <CollectionIcon className="active__icon menu__icon" />
            </Item>
          </li>
          <li className={`${direction === Direction.Horizontal ? 'float-left' : 'block'} relative`}>
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
      {width > 640 ? null : <hr className="h-1 bg-gray-300 my-3" />}
      <nav className="font-mono text-right sm:py-2 sm:pl-5 sm:m-auto sm:mr-0">
        <ul className="inline-block sm:justify-end sm:flex sm:gap-2 sm:flex-wrap sm:content-end" id="menu">
          {auth.isLoggedIn() ? (
            <li
              className={direction === Direction.Horizontal ? 'float-left' : 'block'}
              onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
            >
              <h2 className="w-11/12 text-xl text-center font-semibold text-gray-50 bg-gray-400 bg-opacity-80 p-2">
                <NavLink to={`/user/${currentUser.username}`}>
                  {currentUser.firstName + ' ' + currentUser.lastName}
                </NavLink>
              </h2>
              <Item to="/auth/logout">
                <span className="menu__text">Logout</span>
                <LoginIcon className="active__icon menu__icon" />
              </Item>
            </li>
          ) : (
            <>
              <li
                className={direction === Direction.Horizontal ? 'float-left' : 'block'}
                onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
              >
                <Item to="/auth/login">
                  <span className="menu__text">Login</span>
                  <LoginIcon className="active__icon menu__icon" />
                </Item>
              </li>
              <li
                className={direction === Direction.Horizontal ? 'float-left' : 'block'}
                onClick={() => document.getElementsByClassName('active__span')[0]?.remove()}
              >
                <Item to="/auth/register">
                  <span className="menu__text">Register</span>
                  <PlusIcon className="active__icon menu__icon" />
                </Item>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

const SubMenu: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { width } = useWindowSize();
  const direction = width > 640 ? Direction.Horizontal : Direction.Vertical;
  const { collapsedSider, setCollapsedSider } = useCollapseContext();
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

  useEffect(() => {
    document.addEventListener('click', onClickOutSide);
    return () => document.removeEventListener('click', onClickOutSide);
  });

  const onClickOutSide = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setActiveSubMenu(false);
  };

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
    <div ref={wrapperRef}>
      <span
        className={`menu__item menu__item--padding active__sub ${
          direction === Direction.Horizontal ? 'menu__item--horizontal' : 'menu__item--vertical'
        }`}
        onClick={() => setActiveSubMenu(!activeSubMenu)}
      >
        <span className="menu__text">Data</span>
        <CubeIcon className="active__icon menu__icon" />
        {activeSubMenu ? (
          <>
            <ChevronDownIcon className="inline-block ml-1.5 text-gray-400 text-opacity-95 pointer-events-none h-6 sm:h-5 sm:ml-0" />
          </>
        ) : (
          <>
            <ChevronLeftIcon className="inline-block ml-1.5 text-gray-400 text-opacity-95 pointer-events-none h-6 sm:h-5 sm:ml-0" />
          </>
        )}
      </span>
      <div
        className={`row-sub-menu${
          activeSubMenu
            ? ' grid sm:absolute sm:right-0 sm:w-32 sm:bg-gray-50 sm:rounded-tl-md sm:rounded-bl-md sm:z-20 sm:px-3 sm:pt-1 sm:pb-3 sm:grid-cols-1 sm:shadow-btn'
            : ' hidden'
        }`}
        onClick={addActiveSpan}
      >
        <div className="col-sub-menu" onClick={() => setActiveSubMenu(false)}>
          <Item to="/region" activeSubMenu={true}>
            <span className="sub-menu__text">Region</span>
          </Item>
        </div>
        <div className="col-sub-menu" onClick={() => setActiveSubMenu(false)}>
          <Item to="/pokedex" activeSubMenu={true}>
            <span className="sub-menu__text">Pokedex</span>
          </Item>
        </div>
      </div>
    </div>
  );
};

export const Item: React.FC<TItem> = ({ to, children, activeSubMenu }) => {
  const { setCollapsedSider } = useCollapseContext();
  const { width } = useWindowSize();
  const direction = width > 640 ? Direction.Horizontal : Direction.Vertical;

  return (
    <>
      <NavLink
        exact
        to={to}
        activeClassName="active"
        className={`${activeSubMenu ? 'sub-menu__item menu__item--horizontal' : 'menu__item'} ${
          direction === Direction.Horizontal ? 'menu__item--horizontal' : 'menu__item--vertical'
        } sm:text-center`}
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
