export async function fetchAllPages(url: string, getter: (u: string) => Promise<any>) {
  let results: any[] = [];
  let next: string | null = url;
  while (next) {
    const res = await getter(next);
    const data = res.data;
    results = results.concat(data.results ?? data);
    if (data.next) {
      try {
        const nextUrl = new URL(data.next);
        const splitPath: string = (next as string).split("?")[0];
        next = splitPath + nextUrl.search;
      } catch {
        next = null;
      }
    } else {
      next = null;
    }
  }
  return results;
}
