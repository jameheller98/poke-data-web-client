import { SearchIcon, XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const SearchInput: React.FC<{
  searchValue: string;
  onChangeSearchValue: (e: { target: { value: string } }) => void;
  clearSearchValue: () => void;
}> = ({ searchValue, onChangeSearchValue, clearSearchValue }) => (
  <>
    <div className="col-start-1 col-end-3 border-none bg-gray-200 bg-opacity-50 flex items-center mx-3 my-2">
      <SearchIcon className="w-6 mx-3 my-2 inline-block text-gray-400" />
      <input
        className="h-6 bg-transparent text-xl outline-none text-gray-700 w-9/12"
        type="text"
        placeholder="Search"
        onChange={onChangeSearchValue}
        value={searchValue}
      />
      {searchValue ? <XIcon className="w-6 mx-3 my-2 inline-block text-gray-400" onClick={clearSearchValue} /> : null}
    </div>
  </>
);

SearchInput.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  clearSearchValue: PropTypes.func.isRequired,
};

export default SearchInput;
