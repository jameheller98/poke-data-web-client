/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const importData = (r: any) => r.keys().map(r);

export { capitalize, importData };
