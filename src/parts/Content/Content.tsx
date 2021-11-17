import PropTypes from 'prop-types';

type ContentProps = {
  children: JSX.Element;
};

const Content: React.FC<ContentProps> = ({ children }) => (
  <>
    <div className="container m-auto h-full w-full bg-gray-100 pb-16 sm:mt-10 lg:px-16">{children}</div>
  </>
);

Content.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Content;
