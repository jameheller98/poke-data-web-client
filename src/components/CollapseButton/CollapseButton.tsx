import PropTypes from 'prop-types';
import { useCollapseContext } from '../../contexts/MainLayoutContext';
import './CollapseButton.scss';

type CollapseButtonProp = {
  size: number;
};

const CollapseButton: React.FC<CollapseButtonProp> = ({ size }) => {
  const { collapsedSider, setCollapsedSider } = useCollapseContext();
  const propsButton = {
    widthRect: size - 10,
    heightRect: size - 10,
    distanceRect: 5,
    distanceLine: size / 3.25,
    strokeRect: 2.5,
    widthLine: size / 2.5,
    heightLine: size * 0.07,
  };

  const CreateCollapseLine = () => {
    const Lines = [],
      distanceBetweenLine = (propsButton.heightRect - propsButton.strokeRect * 2 - propsButton.heightLine * 3) / 4;

    for (let i = 0; i < 3; i++) {
      Lines.push(
        <rect
          key={i}
          x={propsButton.distanceLine}
          y={
            propsButton.distanceRect +
            propsButton.strokeRect +
            distanceBetweenLine * (i + 1) +
            propsButton.heightLine * i
          }
          width={propsButton.widthLine}
          height={propsButton.heightLine}
          fill="rgba(49, 46, 129, 0.9)"
        />,
      );
    }

    return Lines;
  };

  return (
    <>
      <div
        className="collapse-button block relative bg-white shadow-btn rounded-md active:top-1"
        onClick={() => {
          setCollapsedSider(collapsedSider ? false : true);
        }}
      >
        <svg width={size} height={size}>
          <rect
            x="5"
            y="5"
            rx="5"
            width={propsButton.widthRect}
            height={propsButton.heightRect}
            fill="rgba(255, 255, 255, 1)"
            stroke="rgba(49, 46, 129, 0.9)"
            strokeWidth={propsButton.strokeRect}
          />
          {CreateCollapseLine()}
        </svg>
      </div>
    </>
  );
};

CollapseButton.propTypes = {
  size: PropTypes.number.isRequired,
};

export default CollapseButton;
