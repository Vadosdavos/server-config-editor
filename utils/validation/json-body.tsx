export const JsonBodyValidator = async (_: unknown, value: string) => {
  if (!value) {
    return;
  }
  try {
    JSON.parse(value);
  } catch (e) {
    throw new Error("Invalid JSON");
  }
};
