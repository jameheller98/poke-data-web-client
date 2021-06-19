import PropTypes from 'prop-types';

type ContentProps = {
  children: JSX.Element;
};

const Content: React.FC<ContentProps> = ({ children }) => (
  <>
    <div className="container h-full w-screen bg-gray-100 pb-16">{children}</div>
  </>
);

Content.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Content;
