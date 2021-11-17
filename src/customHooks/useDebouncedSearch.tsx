/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useDispatch } from 'react-redux';
import useConstant from 'use-constant';

// Generic reusable hook
const useDebouncedSearch = (searchFunction: any, arrayDispatch = [{ type: '' }]) => {
  const dispatch = useDispatch();
  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, 1000));

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    arrayDispatch.forEach((item) => dispatch(item));
    return debouncedSearchFunction(inputText);
  }, [debouncedSearchFunction, inputText]);

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedSearch;
