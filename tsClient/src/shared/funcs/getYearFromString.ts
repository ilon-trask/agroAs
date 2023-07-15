function getYearFromString(arg: string | null) {
  if (arg) return +arg.split("-")[0];
}

export default getYearFromString;
