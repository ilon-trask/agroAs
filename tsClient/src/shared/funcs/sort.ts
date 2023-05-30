export default function sort<T>(prop: T[]) {
  const arr = JSON.parse(JSON.stringify(prop));
  //@ts-ignore
  arr.sort((a, b) => {
    if ("createdAt" in a && "createdAt" in b) {
      return +new Date(a.createdAt) - +new Date(b.createdAt);
    }
  });
  return arr as T[];
}
