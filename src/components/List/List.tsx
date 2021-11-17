import propTypes from 'prop-types';
import React from 'react';

interface IList {
  Item: React.FC<TListItemProps>;
}

type TListItemProps = {
  children: React.ReactNode;
  className?: string;
};

const List: React.FC<TListItemProps> & IList = ({ children, className }) => <ul className={className}>{children}</ul>;

export const Item: React.FC<TListItemProps> = ({ children }) => <li>{children}</li>;

List.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};

Item.propTypes = {
  children: propTypes.node.isRequired,
};

List.Item = Item;

export default List;
