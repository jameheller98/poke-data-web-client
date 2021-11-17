/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { builder } from '../../adapters/BuildAdapter';
import { selectCurrentUser } from '../../pages/Auth/AuthSlice';
import { padLeft } from '../../utilities/utils';
import List, { Item } from '../List/List';

const User: React.FC = () => {
  const [arrListPokemon, setArrListPokemon] = useState<any>([]);
  const currentUser = useSelector(selectCurrentUser);
  const arrSelectPokemon = arrListPokemon;

  useEffect(() => {
    const getListSelectPokemon = () => {
      currentUser.id &&
        builder.getSelectPokemon(currentUser.id).then((json) =>
          json.map((item: any) => {
            setArrListPokemon((arrListPokemon: any) => [
              ...arrListPokemon,
              { id: item.id, builder: JSON.parse(item.builder) },
            ]);
          }),
        );
    };
    getListSelectPokemon();
  }, [currentUser]);

  const deleteBuilder = (id: number) => {
    builder.deleteListSelectPokemon(id);
    setArrListPokemon(arrListPokemon.filter((item: any) => item.id !== id));
  };

  const listSelectPokemon = arrSelectPokemon.map((item: any, index: number) => {
    const { id, builder } = item;

    return (
      <div key={index}>
        <div className="grid grid-cols-3">
          <div className="col-start-1 text-left lg:text-right xl:text-right">
            <button className="bg-green-400 text-white m-2 p-2 rounded-md">update</button>
          </div>
          <div className="col-start-2 text-center flex items-center justify-center">
            <h1 className="text-2xl text-green-800 font-semibold">Builder {index + 1}</h1>
          </div>
          <div className="col-start-3 text-right lg:text-left xl:text-left">
            <button className="bg-green-400 text-white m-2 p-2 rounded-md" onClick={() => deleteBuilder(id)}>
              delete
            </button>
          </div>
        </div>

        <List className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 p-8 xl:h-64">
          {builder.map((pokemon: { select: boolean; item: any }, index: number) => {
            return (
              <Item key={index}>
                <article
                  className={`w-full h-40 xl:h-full rounded-lg${
                    pokemon.item?.id ? ' bg-gray-50' : ' flex bg-gray-300'
                  }`}
                >
                  {
                    <div key={index} className="relative w-full">
                      <figure className="bg-gray-50 rounded-xl pt-6 relative contents">
                        {pokemon.item?.sprites?.order?.dream_world?.front_default ? (
                          <img
                            className="absolute z-0 left-1/2 transform -translate-x-1/2 h-32 w-32"
                            src={pokemon.item?.sprites?.order?.dream_world?.front_default}
                            alt={pokemon.item?.name}
                            width="128"
                            height="128"
                          />
                        ) : null}
                        <img
                          className={`card-img-top m-auto relative bg-gray-50${
                            pokemon.item?.sprites?.order?.dream_world?.front_default
                              ? ' transition-opacity hover:opacity-0'
                              : ''
                          }`}
                          src={
                            pokemon.item?.sprites?.versions?.['generation-vii']?.['ultra-sun-ultra-moon']?.front_default
                              ? pokemon.item?.sprites?.versions?.['generation-vii']?.['ultra-sun-ultra-moon']
                                  ?.front_default
                              : pokemon.item?.sprites?.front_default
                          }
                          alt={pokemon.item?.name}
                          width="128"
                          height="128"
                        />
                        <figcaption className="text-xl tracking-wide text-center text-blue-900 pb-3 capitalize">
                          {pokemon.item?.name}
                        </figcaption>
                      </figure>
                      <span className="absolute top-0 right-0 pt-1 pr-3 text-sm text-gray-700">
                        #<span style={{ marginLeft: '1px' }}>{pokemon.item?.id && padLeft(pokemon.item?.id, 3)}</span>
                      </span>
                    </div>
                  }
                </article>
              </Item>
            );
          })}
        </List>
      </div>
    );
  });

  return <>{listSelectPokemon}</>;
};

export default User;
