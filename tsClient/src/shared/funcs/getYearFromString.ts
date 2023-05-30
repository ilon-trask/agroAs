function getYearFromString(arg: string) {
  return +arg.split("-")[0];
}

export default getYearFromString;
