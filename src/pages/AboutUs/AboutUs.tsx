import { Link } from 'react-router-dom';
import wallpaper from '../../assets/images/wallpaper/wallpaperPokemon.png';

const AboutUs: React.FC = () => (
  <section className="p-3 overflow-hidden relative">
    <img
      className="w-full h-full object-cover opacity-20 absolute z-0 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      src={wallpaper}
      height="1024"
      width="1280"
    />
    <h1 className="font-semibold text-gray-800 text-2xl tracking-wide mt-1 relative z-10">
      &quot;About PokémonDex&quot;
    </h1>
    <p className="p-3 mt-2 text-lg shadow-inner text-gray-800 bg-gray-5 relative z-10">
      <cite title="Pokémon Dex">PKMDex</cite> stores more data Pokémon, you can find more information of a Pokémon this
      here like as <cite>Pikachu</cite>, <cite>Mewtwo</cite>, <cite>Ho-oh</cite>... This Web page is created a common
      purpose so it&apos;s friendly to everyone come and explore it{' '}
      <Link to="/">
        <strong className="text-blue-600">here</strong>
      </Link>
      .
    </p>
  </section>
);

export default AboutUs;
