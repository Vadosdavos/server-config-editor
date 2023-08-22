export const joinAndCapitalize = (input: string | string[]) => {
  const str = Array.isArray(input) ? input.join("") : input;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
