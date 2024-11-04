export const pathUtil = {
  validated(path: string) {
    let validatedPath = path;

    if (validatedPath.startsWith("/")) {
      validatedPath = validatedPath.slice(1);
    }

    if (validatedPath.endsWith("/")) {
      validatedPath = validatedPath.slice(-1);
    }

    return validatedPath;
  },
};
