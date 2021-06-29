/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';

// Generic reusable hook
const useDebouncedSearch = (searchFunction: any) => {
  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, 300));

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
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
