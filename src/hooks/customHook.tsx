import React from 'react';

function useForceUpdate(): () => void {
  return React.useReducer(() => ({}), {})[1] as () => void; // <- paste here
}

export { useForceUpdate };
