import ImageLazy from '../../imageLazy.svg';
import React, { useEffect, useState } from 'react';
import Table, { TColumn, TData } from '../../components/Table/Table';
import { builder } from '../../adapters/BuildAdapter';
import typeColor from '../Pokemon/typeColor.json';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/solid';

const dataTypeColor: { [key: string]: string } = typeColor;

type TTableTypeProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arrSelectPokemon: any[];
};

const TableBuilderTypes: React.FC<TTableTypeProps> = ({ arrSelectPokemon }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataTypes, setDataTypes] = useState<any>([]);

  useEffect(() => {
    builder.getTypes().then(async (res) => {
      const newTypes = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.map(async (type: any) => ({ ...type, type: await axios.get(type.url).then((res) => res.data) })),
      );

      return setDataTypes(newTypes);
    });
  }, []);

  const arrHeaderPokemon = arrSelectPokemon.map((pokemon, index) => ({
    title: (
      <div className="h-fit-content w-20 text-gray-50 capitalize">
        <img
          className="m-auto"
          src={pokemon.item.sprites?.front_default ? pokemon.item.sprites?.front_default : ImageLazy}
          alt={pokemon.item.name ? pokemon.item.name : index}
          height={70}
          width={70}
        />
        {pokemon.item.types?.map((type: { slot: number; type: { name: string } }) => (
          <div key={type.slot} className={`px-1 rounded-md ${dataTypeColor[type.type.name]}`}>
            {' '}
            {type.type.name}
          </div>
        ))}
      </div>
    ),
    key: index.toString(),
    className: `p-0${pokemon.item.sprites?.front_default ? ' align-bottom' : ''}`,
  }));

  const arrColumnPokemons = arrSelectPokemon.reduce((arr, pokemon, index) => {
    const newArr = Object.keys(arr).includes(String(pokemon.item.name))
      ? Object.assign({}, arr, {
          [pokemon.item.name + index.toString()]: pokemon.item.types,
        })
      : Object.assign({}, arr, {
          [pokemon.item.name]: pokemon.item.types,
        });
    return newArr;
  }, {});

  const columns: TColumn[] = [
    {
      title: (
        <>
          <div className="m-auto bottom-0 w-full">
            Move
            <div className="bg-gray-600 text-gray-50 px-2">Attack</div>
            <ChevronDownIcon className="h-8 m-auto" />
          </div>
        </>
      ),
      key: 'type',
      className: 'font-normal w-20 bg-gray-100 align-bottom',
    },
    ...arrHeaderPokemon,
    {
      title: (
        <div className="p-2 bg-red-100 text-red-800">
          Total
          <br />
          weak
        </div>
      ),
      key: 'totalWeak',
    },
    {
      title: (
        <div className="p-2 bg-green-100 text-green-800">
          Total
          <br />
          resist
        </div>
      ),
      key: 'totalResist',
    },
  ];

  const data: TData[] = dataTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((dataType: any) => !['unknown', 'shadow'].includes(dataType.name))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((dataType: any, index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const objectColumnPokemon = Object.keys(arrColumnPokemons).reduce((object: any, pokemon: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const objPokemon = arrColumnPokemons[pokemon]?.reduce((obj: any, item: any) => {
          const arrDamage = obj[pokemon] || [];

          Object.keys(dataType.type.damage_relations).map((damage) => {
            // if (
            //   damage === 'double_damage_from' &&
            //   dataType.type.damage_relations[damage].some(
            //     (itemDamge: { name: string }) => itemDamge.name === item.type.name,
            //   )
            // ) {
            //   arrDamage.push('x2 green');
            // }
            if (
              damage === 'double_damage_to' &&
              dataType.type.damage_relations[damage].some(
                (itemDamge: { name: string }) => itemDamge.name === item.type.name,
              )
            ) {
              arrDamage.push(2);
            }
            // if (
            //   damage === 'half_damage_from' &&
            //   dataType.type.damage_relations[damage].some(
            //     (itemDamge: { name: string }) => itemDamge.name === item.type.name,
            //   )
            // ) {
            //   arrDamage.push('x1/2 red');
            // }
            if (
              damage === 'half_damage_to' &&
              dataType.type.damage_relations[damage].some(
                (itemDamge: { name: string }) => itemDamge.name === item.type.name,
              )
            ) {
              arrDamage.push(0.5);
            }
            // if (
            //   damage === 'no_damage_from' &&
            //   dataType.type.damage_relations[damage].some(
            //     (itemDamge: { name: string }) => itemDamge.name === item.type.name,
            //   )
            // ) {
            //   arrDamage.push('x0 red');
            // }
            if (
              damage === 'no_damage_to' &&
              dataType.type.damage_relations[damage].some(
                (itemDamge: { name: string }) => itemDamge.name === item.type.name,
              )
            ) {
              arrDamage.push(0);
            }
          });
          // console.log(arrDamage);
          const objPokemonType = Object.assign({}, { [pokemon]: arrDamage });
          return objPokemonType;
        }, {});

        const damage = objPokemon?.[pokemon].reduce((total: number, item: number) => {
          return total * item;
        }, 1);

        const obj = Object.assign({}, object, {
          [pokemon]: {
            damage,
            [pokemon]: (
              <div className="font-extrabold text-center border-gray-400 border-r-2 border-dashed h-full text-2xl flex items-center justify-center">
                {objPokemon?.[pokemon].length === 0 || damage === undefined ? null : damage === 0 ? (
                  <div className="text-xs">No damage</div>
                ) : damage === 0.25 ? (
                  <>
                    <div style={{ width: 'fit-content' }} className="bg-green-600 text-green-50 rounded-md m-auto px-1">
                      <sup>1</sup>/<sub>4</sub>
                      <sup>x</sup>
                    </div>
                  </>
                ) : damage === 0.5 ? (
                  <>
                    <div className="text-green-600">
                      <sup>1</sup>/<sub>2</sub>
                      <sup>x</sup>
                    </div>
                  </>
                ) : damage === 1 ? null : damage === 2 ? (
                  <>
                    <div className="text-red-500">
                      2<sup>x</sup>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ width: 'fit-content' }} className="bg-red-600 text-red-50 rounded-md m-auto px-1">
                      4<sup>x</sup>
                    </div>
                  </>
                )}
              </div>
            ),
          },
        });
        return obj;
      }, {});

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const object = Object.keys(objectColumnPokemon).reduce((obj: any, item: any) => {
        return Object.assign({}, obj, { [item]: objectColumnPokemon[item][item] });
      }, {});

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalWeak = Object.keys(objectColumnPokemon).reduce((total: any, item: any) => {
        if (objectColumnPokemon[item].damage === 2 || objectColumnPokemon[item].damage === 4) return total + 1;
        return total;
      }, 0);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalResist = Object.keys(objectColumnPokemon).reduce((total: any, item: any) => {
        if (objectColumnPokemon[item].damage === 0.25 || objectColumnPokemon[item].damage === 0.5) return total + 1;
        return total;
      }, 0);

      return {
        key: dataType.name,
        type: (
          <div
            className={`text-gray-50 capitalize font-semibold text-md text-right p-1 pr-2 w-20 border-gray-400 border-r-2 rounded-sm ${
              dataTypeColor[dataType.name]
            }`}
          >
            {dataType.name}
          </div>
        ),
        ...object,
        totalWeak: (
          <div
            className={`text-center text-xl ${
              index % 2 === 0 ? 'bg-red-100' : 'bg-red-200'
            } text-red-50 border-gray-400 border-r-2 h-full rounded-sm`}
          >
            {totalWeak === 0 ? null : <div className="bg-red-400">{totalWeak}</div>}
          </div>
        ),
        totalResist: (
          <div
            className={`text-center text-xl ${
              index % 2 === 0 ? 'bg-green-100' : 'bg-green-200'
            } text-green-50 border-gray-400 border-r-2 h-full rounded-sm`}
          >
            {totalResist === 0 ? null : <div className="bg-green-400">{totalResist}</div>}
          </div>
        ),
        className: index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300',
      };
    });

  return (
    <>
      <div style={{ display: 'block', overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }} className="m-6">
        <Table columns={columns} data={data} className="shadow-inner bg-gray-100 relative" width="500px" />
      </div>
    </>
  );
};

TableBuilderTypes.propTypes = {
  arrSelectPokemon: PropTypes.array.isRequired,
};

export default TableBuilderTypes;
