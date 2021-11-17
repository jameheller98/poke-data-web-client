import { useSelector } from 'react-redux';
import { selectPokemon } from './PokemonSlice';

const percentStatsColor = {
  '1/6': 'bg-red-700',
  '2/6': 'bg-red-400',
  '3/6': 'bg-yellow-300 bg-opacity-90',
  '4/6': 'bg-green-light bg-opacity-70',
  '5/6': 'bg-blue-600',
  '6/6': 'bg-blue-900 bg-opacity-70',
};

const BaseStatPokemon: React.FC = () => {
  const pokemon = useSelector(selectPokemon);
  const totalBaseStat = pokemon?.stats.reduce((total: number, stat: { base_stat: number }) => {
    return total + stat.base_stat;
  }, 0);
  const stats = pokemon?.stats.map((stat: { stat: { name: string }; base_stat: number }, index: number) => {
    const percentStat = Number((stat.base_stat * 100) / 180).toFixed(2);
    return (
      <tr className="border-gray-100 border-t-2 border-b-2" key={index}>
        <th className="font-medium text-gray-600 w-3/12 p-1 pr-6 text-right text-sm capitalize bg-">
          {stat.stat.name
            .split('-')
            .map((item, index) => {
              if (item === 'special') return 'Sp.';
              if (index > 0) {
                if (item === 'attack') return 'Atk';
                if (item === 'defense') return 'Def';
              }
              return item;
            })
            .join(' ')}
        </th>
        <td className="py-1 pr-4 w-1/12">{stat.base_stat}</td>
        <td className="py-1">
          <div
            style={{ width: percentStat + '%' }}
            className={`h-3 bg-gray-400 rounded-sm ${
              Number(percentStat) < Number(Number((1 / 6) * 100).toFixed(2))
                ? percentStatsColor['1/6']
                : Number(percentStat) < Number(Number((2 / 6) * 100).toFixed(2))
                ? percentStatsColor['2/6']
                : Number(percentStat) < Number(Number((3 / 6) * 100).toFixed(2))
                ? percentStatsColor['3/6']
                : Number(percentStat) < Number(Number((4 / 6) * 100).toFixed(2))
                ? percentStatsColor['4/6']
                : Number(percentStat) < Number(Number((5 / 6) * 100).toFixed(2))
                ? percentStatsColor['5/6']
                : percentStatsColor['6/6']
            }`}
          ></div>
        </td>
        <td className="py-1 px-2 w-1/12">
          {stat.stat.name === 'hp'
            ? 2 * stat.base_stat + 110
            : Math.floor(2 * stat.base_stat + 5 - (2 * stat.base_stat + 5) / 10)}
        </td>
        <td className="py-1 px-2 w-1/12">
          {stat.stat.name === 'hp' ? 2 * stat.base_stat + 204 : Math.ceil(2.2 * stat.base_stat + 108)}
        </td>
      </tr>
    );
  });

  return (
    <>
      <section className="p-3">
        <table className="text-base text-gray-900 bg-gray-50 w-full font-medium">
          <caption className="font-bold text-gray-900 text-2xl text-left mb-2">Base stats</caption>
          <tbody>{stats}</tbody>
          <tfoot>
            <tr className="border-gray-100 border-t-2 border-b-2 text-gray-600">
              <th className="font-medium w-3/12 p-1 pr-6 text-right text-sm">Total</th>
              <td className="py-1 pr-4 w-1/12 font-semibold text-gray-900">{totalBaseStat}</td>
              <td className="py-1"></td>
              <td className="py-1 px-2 w-1/12">Min</td>
              <td className="py-1 px-2 w-1/12">Max</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </>
  );
};

export default BaseStatPokemon;
