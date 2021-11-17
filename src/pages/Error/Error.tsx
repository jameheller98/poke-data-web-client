import PropTypes from 'prop-types';

type TError = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};
const Error: React.FC<TError> = ({ error }) => {
  return (
    <div className="h-96 text-gray-700 flex items-center justify-center">
      <div className="text-4xl">
        {error.name} {error.response?.status} {error.response?.data}!
        <div className="text-2xl mt-6 text-center">Please back to homepage</div>
      </div>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.any.isRequired,
};

export default Error;
