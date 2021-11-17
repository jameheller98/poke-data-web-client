import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InfoPokemon from './InfoPokemon';
import { fetchPokemon, fetchSpeciesPokemon } from './PokemonSlice';
import './pokemon.scss';
import BaseStatPokemon from './BaseStatPokemon';

const Pokemon: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchPokemon(id));
    dispatch(fetchSpeciesPokemon(id));
  }, []);

  return (
    <>
      <section>
        <header>
          <nav className="flex my-2 mx-5 p-2 bg-white shadow-btn rounded-b-md text-gray-700">
            <h1 className="mr-3 text-lg font-semibold text-gray-800 leading-8">Content</h1>
            <ul id="nav-content" className="flex gap-x-2 overflow-auto py-1">
              <li className="px-2 h-fit-content self-center">
                <a href="#infoPokemon">Info</a>
              </li>
            </ul>
          </nav>
        </header>
        <div id="infoPokemon">
          <InfoPokemon />
          <BaseStatPokemon />
        </div>
      </section>
    </>
  );
};

export default Pokemon;
