import type { NextRequest } from 'next/server';
import { usePrisma } from '../../../components/custom_hooks/usePrisma';
import { useQueryTools } from '../../../components/custom_hooks/useQueryTools';


export async function GET(request: NextRequest) {
  const [ prismaClient ] = usePrisma();
  const { getQueryParamArray } = useQueryTools(request);
  
  const components = getQueryParamArray("component");
  const languageCode : string = request.nextUrl.searchParams.get("language") || "en-EN";
  const translations = await prismaClient.dictionary.findMany({
    where: {
      AND: [
        {
          component: {
            in: components
          }
        },
        {
          language: {
            is: {
              languageCode: languageCode
            }
          }
        }
      ]
    }
  });
  
  return new Response(JSON.stringify(translations));
}