import PropTypes from 'prop-types';

const tooltipPropTypes = {
  validate: PropTypes.arrayOf(
    PropTypes.shape({
      valid: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
};

export type TTooltipProps = PropTypes.InferProps<typeof tooltipPropTypes> | null | undefined;

const Tooltip: React.FC<TTooltipProps> = ({ validate }) => {
  const fieldError = validate?.map((valid, index) => (
    <article className="text-md text-red-500" key={index}>
      {valid?.message
        .split(' ')
        .reduce((arr, item) => arr.concat(item), ['*'])
        .join(' ')}
    </article>
  ));

  return (
    <>
      <section>{fieldError}</section>
    </>
  );
};

Tooltip.propTypes = tooltipPropTypes;

export default Tooltip;
