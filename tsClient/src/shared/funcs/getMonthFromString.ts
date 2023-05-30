function getMonthFromString(arg: string) {
  return +arg.split("-")[1];
}

export default getMonthFromString;
