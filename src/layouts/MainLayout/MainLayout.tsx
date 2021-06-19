import PropTypes from 'prop-types';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { CollapseContext } from '../../contexts/MainLayoutContext';
import { useEffect, useRef, useState } from 'react';
import Menu from '../../components/Menu';
import Content from '../../parts/Content';
import Footer from '../../parts/Footer';
import Header from '../../parts/Header';
import Sider from '../../parts/Sider';

type MainLayoutProps = {
  children: JSX.Element;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [collapsedSider, setCollapsedSider] = useState<boolean>(true);
  const [activeBackToHead, setActiveBackToHead] = useState<boolean>(false);
  const scrollToHead = () => {
    headerRef.current && headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };
  const backToHead = () => {
    const scrollHeightHeader = headerRef.current && headerRef.current.scrollHeight * 2;

    if (scrollHeightHeader !== null && window.scrollY > scrollHeightHeader) {
      return setActiveBackToHead(true);
    }
    return setActiveBackToHead(false);
  };
  useEffect(() => {
    document.addEventListener('scroll', backToHead);
    return () => {
      document.removeEventListener('scroll', backToHead);
    };
  }, []);
  return (
    <>
      <CollapseContext.Provider value={{ collapsedSider, setCollapsedSider }}>
        <div ref={headerRef}>
          <Header />
        </div>
        <Sider>
          <Menu />
        </Sider>
        <Content>{children}</Content>
        {activeBackToHead ? (
          <ChevronUpIcon
            className="h-12 w-12 fixed bottom-4 right-4 text-white text-opacity-60 bg-black bg-opacity-20 rounded-full shadow-btn"
            onClick={scrollToHead}
          />
        ) : null}
        <Footer />
      </CollapseContext.Provider>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
