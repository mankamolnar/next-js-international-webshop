import type { NextRequest } from 'next/server';

export const useQueryTools = (request : NextRequest) => {
  const getQueryParamArray = (param : string) => {
    const result : string[] = [];
    let index : number = 0;
    let currentParam : string | null;

    do {
      currentParam = request.nextUrl.searchParams.get(`${param}[${index}]`);
      if (currentParam) {
        result.push(currentParam);
      }
      index++;

    } while(currentParam);

    return result;
  };


  return {
    getQueryParamArray: getQueryParamArray
  }
}