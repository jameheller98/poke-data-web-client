import { ReactComponent as Logo } from '../../pokeball.svg';

const Brand: React.FC = () => (
  <>
    <div className="inline-block">
      <Logo className="h-12 sm:h-10" />
    </div>
  </>
);

export default Brand;
