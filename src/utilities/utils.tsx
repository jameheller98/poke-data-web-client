/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const importData = (r: any) => r.keys().map(r);

function padLeft(nr: number, n: number, str?: string) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

export { capitalize, importData, padLeft };
