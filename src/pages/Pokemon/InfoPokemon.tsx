import { useSelector } from 'react-redux';
import { selectPokedexNumbers, selectPokemon, selectSpeciesPokemon } from './PokemonSlice';
import { padLeft } from '../../utilities/utils';
import typeColor from './typeColor.json';
import HTMLReactParser from 'html-react-parser';

const dataTypeColor: { [key: string]: string } = typeColor;

const InfoPokemon: React.FC = () => {
  const speciesPokemon = useSelector(selectSpeciesPokemon);
  const pokemon = useSelector(selectPokemon);
  const pokedexNumber = useSelector(selectPokedexNumbers);
  const loading = useSelector((state: { pokemon: { loading: boolean } }) => state.pokemon.loading);

  if (loading) {
    return (
      <section className="p-3">
        <figure>
          <figcaption className="text-4xl font-bold text-gray-700 text-center capitalize tracking-wide"></figcaption>
          <div className="animate-pulse m-auto mb-3 h-80 w-80 bg-gray-300"></div>
        </figure>
        <table className="text-base text-gray-900 bg-gray-50 w-full font-medium">
          <caption className="font-bold text-gray-900 text-2xl text-left mb-2">Pokedex data</caption>
          <tbody>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 w-4/12 p-1 pr-6 text-right text-sm">National &#8470;</th>
              <td>
                <div className="animate-pulse m-2 h-5 w-3/4 bg-gray-300"></div>
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-2 pr-6 text-right text-sm">Type</th>
              <td className="py-1">
                <div className="animate-pulse m-2 h-5 w-3/4 bg-gray-300"></div>
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Species</th>
              <td className="py-1">
                <div className="animate-pulse m-2 h-5 w-3/4 bg-gray-300"></div>
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Height</th>
              <td className="py-1">
                <div className="animate-pulse m-2 h-5 w-3/4 bg-gray-300"></div>
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Weight</th>
              <td className="py-1">
                <div className="animate-pulse m-2 h-5 w-3/4 bg-gray-300"></div>
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Abilities</th>
              <td className="py-1">
                <div className="animate-pulse m-2 h-5 w-3/4 bg-gray-300"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }

  const {
    abilities,
    height = 0,
    weight = 0,
    types,
    name,
    sprites: { other: { 'official-artwork': { front_default = '' } = {} } = {} } = {},
  } = pokemon || {};
  const { genera, id = 0 } = speciesPokemon || {};
  const versionGroups = pokedexNumber?.map((pokedexNumber: { version_groups: [] }) => {
    return pokedexNumber.version_groups;
  });

  let count = 0;

  const versions = versionGroups
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.reduce((arr: any, item: any) => {
      item.forEach((version: { id: number; version_groups: { entry_number: number } }, index: number) => {
        if (index === 0 && arr) return (arr[count] = [version]);
        if (version?.id - 1 === item?.[index - 1]?.id && arr) {
          return arr[count].push(version);
        }
        count++;
        arr && (arr[count] = [version]);
        return arr;
      });
      count++;
      return arr;
    }, [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((arr1: any, arr2: any) => {
      const a = arr1[arr1.length - 1];
      const b = arr2[arr2.length - 1];
      return a?.id > b?.id ? 1 : b?.id > a?.id ? -1 : 0;
    });
  // console.log(speciesPokemon);
  // console.log(pokemon);

  return (
    <>
      <section className="p-3">
        <figure>
          <figcaption className="text-4xl font-bold text-gray-700 text-center capitalize tracking-wide">
            {name}
          </figcaption>
          <img className="m-auto" src={front_default} height="300" width="300" />
        </figure>
        <table className="text-base text-gray-900 bg-gray-50 w-full font-medium">
          <caption className="font-bold text-gray-900 text-2xl text-left mb-2">Pokedex data</caption>
          <tbody>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 w-4/12 p-1 pr-6 text-right text-sm">National &#8470;</th>
              <td className="font-bold">{padLeft(id, 3)}</td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-2 pr-6 text-right text-sm">Type</th>
              <td className="py-1">
                <div className="flex gap-1">
                  {types?.map(({ type: { name } }: { type: { name: string } }, index: number) => (
                    <button
                      key={index}
                      className={`p-1 ${dataTypeColor[name]} rounded-md uppercase text-sm w-4/12 text-white`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Species</th>
              <td className="py-1">
                {genera?.filter((item: { language: { name: string } }) => item.language.name === 'en').pop().genus}
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Height</th>
              <td className="py-1">
                {Number(height * 0.1).toFixed(1)} m (
                {height < 10 && height % 3 === 0
                  ? Math.ceil((height * 0.1 * 39.3700787) / 12)
                  : Math.floor((height * 0.1 * 39.3700787) / 12)}
                &rsquo;
                {height < 10 && height % 3 === 0
                  ? padLeft(0, 2)
                  : padLeft(
                      Math.round(
                        ((height * 0.1 * 39.3700787) / 12 - Math.floor((height * 0.1 * 39.3700787) / 12)) * 12,
                      ),
                      2,
                    )}
                &rdquo;)
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Weight</th>
              <td className="py-1">
                {Number(weight * 0.1).toFixed(1)} kg ({Number(weight * 0.1 * 2.20462262).toFixed(1)} lbs)
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Abilities</th>
              <td className="py-1">
                {abilities
                  ?.filter((ability: { is_hidden: boolean }) => ability.is_hidden === false)
                  .map(({ ability: { name } }: { ability: { name: string } }, index: number) => (
                    <div className="capitalize" key={index}>
                      {index + 1}. {name}
                    </div>
                  ))}
                {abilities
                  ?.filter((ability: { is_hidden: boolean }) => ability.is_hidden === true)
                  .map(({ ability: { name } }: { ability: { name: string } }, index: number) => (
                    <small className="text-sm py-1" key={index}>
                      <span className="capitalize">{name.split('-').join(' ')}</span>
                      &ensp;
                      <span className="text-gray-500">(hidden ability)</span>
                    </small>
                  ))}
              </td>
            </tr>
            <tr className="border-gray-100 border-t-2 border-b-2">
              <th className="font-medium text-gray-600 p-1 pr-6 text-right text-sm">Local &#8470;</th>
              <td className="py-1">
                <ul>
                  {versions?.length === 0
                    ? HTMLReactParser('&ndash;')
                    : versions
                        ?.filter(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (item: any, index: number) =>
                            ((item[0].entry_number !== versions[index - 1]?.[0].entry_number ||
                              item[0].name !== versions[index - 1]?.[0].name) &&
                              !versions[index - 1]?.[0].name.includes(item[0].name)) ||
                            (item[0].name !== 'sun-moon' && item[0].name !== 'ultra-sun-ultra-moon'),
                        )
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .map((version: any, index: number) => (
                          <li key={index}>
                            {padLeft(version[0].entry_number, 3)}
                            &ensp;
                            <small className="text-gray-500 capitalize tracking-wider">
                              (
                              {version.map(
                                (item: { version_group: { versions: [] } }, index: number) =>
                                  item.version_group.versions
                                    .map((item: { name: string }) =>
                                      item.name
                                        .split('-')
                                        .map((item) => {
                                          if (item.match(/lets/)) return item.replace(/lets/g, "let's");
                                          if (item.match(/red/)) return item.replace(/red/g, 'Red');
                                          if (item.match(/green/)) return item.replace(/green/g, 'Green');
                                          if (item.match(/gold/)) return item.replace(/gold/g, 'Gold');
                                          if (item.match(/silver/)) return item.replace(/silver/g, 'Silver');
                                          return item;
                                        })
                                        .join(' '),
                                    )
                                    .join(`${HTMLReactParser('&#8202;/&#8202;')}`) +
                                  `${index === version.length - 1 ? '' : HTMLReactParser('&#8202;/&#8202;')}`,
                              )}
                              {version.map((item: { name: string; entry_number: number }) => {
                                if (item.name === 'sword-shield')
                                  return speciesPokemon.pokedex_numbers.map(
                                    (version: { entry_number: number; pokedex: { name: string } }) => {
                                      if (
                                        version.entry_number === item.entry_number &&
                                        version.pokedex.name !== 'galar'
                                      )
                                        return HTMLReactParser(' &ndash; ') + version.pokedex.name.split('-').join(' ');
                                    },
                                  );
                                if (item.name === 'x-y')
                                  return speciesPokemon.pokedex_numbers.map(
                                    (version: { entry_number: number; pokedex: { name: string } }) => {
                                      if (version.entry_number === item.entry_number)
                                        return HTMLReactParser(' &ndash; ') + version.pokedex.name.split('-').join(' ');
                                    },
                                  );
                              })}
                              )
                            </small>
                          </li>
                        ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default InfoPokemon;
