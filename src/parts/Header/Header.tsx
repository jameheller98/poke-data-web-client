import { Link } from 'react-router-dom';
import Brand from '../../components/Brand';
import CollapseButton from '../../components/CollapseButton';

const Header: React.FC = () => (
  <>
    <div className="container py-2 px-6 flex items-center justify-between border-indigo-900 border-t-4 border-opacity-90">
      <Link to="/" aria-label="Home">
        <Brand />
      </Link>
      <CollapseButton size={38} />
    </div>
  </>
);

export default Header;
