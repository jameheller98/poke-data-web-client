import PropTypes from 'prop-types';
import React from 'react';

export type TColumn = {
  title: string | React.ReactNode;
  rowIndex?: string;
  key: string;
  className?: string;
  render?: (data: string) => void;
};

export type TData = {
  key: string;
  [key: string]: number | string | React.ReactNode;
  className: string;
};

type TTableProps = {
  columns: TColumn[];
  data: TData[];
  className?: string;
  height?: string;
  width?: string;
};

const Table: React.FC<TTableProps> = ({ columns, data, className, height, width }) => {
  const listColumn = (
    <tr className="border-gray-400 border-b-2">
      {columns.map((column) => (
        <th key={column.key} className={column.className + `${column.key === 'type' ? ' sticky left-0' : ''}`}>
          {column.title}
        </th>
      ))}
    </tr>
  );

  const listData = data.map((item) => {
    return (
      <tr key={item.key} className={item.className}>
        {Object.keys(item)
          .filter((item) => !['key', 'className'].includes(item))
          .map((key) => (
            <td key={key} className={`p-0 ${key === 'type' ? 'sticky left-0 z-10' : 'h-5'}`}>
              {item[key]}
            </td>
          ))}
      </tr>
    );
  });

  return (
    <table style={{ height: height, width: width }} className={className}>
      <tbody>
        {listColumn}
        {listData}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Table;
