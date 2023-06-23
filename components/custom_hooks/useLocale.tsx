export default function useLocale(currentLocale: string) {
  const changeLocaleTo = (path  : string, nextLocale : string) => {
    return path.replace(`\/${currentLocale}\/`, `\/${nextLocale}/`);
  }

  const parseDictionary = (translations : any[]) => {
    const result : any = {};

    const get = (key : string) => {
      if (result[key] === undefined) {
        console.error(key + " kulcsú fordítás nem létezik!");
        return "";
      } else {
        return result[key].translation;
      }
    }

    result.get = get;

    for (let translation of translations) {
      result[translation.key] = translation;
    }

    return result;
  }

  return { changeLocaleTo, parseDictionary };
}