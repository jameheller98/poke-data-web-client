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
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [collapsedSider, setCollapsedSider] = useState<boolean>(true);
  const [activeBackToHead, setActiveBackToHead] = useState<boolean>(false);
  const [activeForwardToFooter, setActiveForwardToFooter] = useState<boolean>(false);
  const scrollToHead = () => {
    headerRef.current && headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  const backToHead = () => {
    const offsetHeightHeader = headerRef.current && headerRef.current?.offsetHeight;
    const offsetHeightFooter = footerRef.current && footerRef.current?.offsetHeight;
    if (offsetHeightHeader && offsetHeightFooter && window.scrollY > offsetHeightHeader * 2) {
      return setActiveBackToHead(true);
    }
    return setActiveBackToHead(false);
  };
  const forwardToFooter = () => {
    const offsetHeightHeader = headerRef.current && headerRef.current?.offsetHeight;
    const offsetHeightContent = contentRef.current && contentRef.current?.offsetHeight;
    const offsetHeightFooter = footerRef.current && footerRef.current?.offsetHeight;
    if (
      offsetHeightHeader &&
      offsetHeightFooter &&
      offsetHeightContent &&
      window.scrollY + 80 > offsetHeightContent - 2 * offsetHeightHeader - 2 * offsetHeightFooter
    ) {
      return setActiveForwardToFooter(true);
    }
    return setActiveForwardToFooter(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', backToHead);
    document.addEventListener('scroll', forwardToFooter);
    return () => {
      document.removeEventListener('scroll', backToHead);
      document.removeEventListener('scroll', forwardToFooter);
    };
  }, []);

  return (
    <>
      <CollapseContext.Provider value={{ collapsedSider, setCollapsedSider }}>
        <header ref={headerRef}>
          <Header />
        </header>
        <aside>
          <Sider>
            <Menu />
          </Sider>
        </aside>
        <main ref={contentRef}>
          <Content>{children}</Content>
          {activeBackToHead && !activeForwardToFooter ? (
            <ChevronUpIcon
              className={`h-12 w-12 fixed bottom-4 right-4 text-white text-opacity-60 bg-black bg-opacity-20 rounded-full shadow-btn`}
              onClick={scrollToHead}
            />
          ) : null}
          {activeForwardToFooter ? (
            <ChevronUpIcon
              className={`h-12 w-12 relative bottom-16 right-4 text-white text-opacity-60 bg-black bg-opacity-20 rounded-full shadow-btn float-right`}
              onClick={scrollToHead}
            />
          ) : null}
        </main>
        <footer ref={footerRef}>
          <Footer />
        </footer>
      </CollapseContext.Provider>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
