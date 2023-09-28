import useLocale from "../custom_hooks/useLocale";
import Link from "next/link";
import LanguageIcon from "./LanguageIcon";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import NavbarBasket from "./NavbarBasket";
import ToggleDarkMode from "./ToggleDarkMode";

const fetchLanguages = async () => {
  const rawData = await fetch(`${process.env.API_DOMAIN}api/get-languages`);
  return await rawData.json();
}

const fetchNavbar = async (language : string) => {
  console.log(`${process.env.API_DOMAIN}api/get-dictionary?language=${language}&component[0]=navbar`);
  const rawData = await fetch(`${process.env.API_DOMAIN}api/get-dictionary?language=${language}&component[0]=navbar`, {
    next: { revalidate: 10 },
  });
  return await rawData.json();
}

/**
 * GLOBAL STORE (REDUX, STORE, ZUSTANG)
 * FETCHING IN CLIENT SIDE
 *  (Hogy oldjuk meg hogy client side-ból fetcheljünk és re-renderben legyen benne)
 */
const NavBar = async (props : any) => {
  const { parseDictionary } = useLocale(props.currentLanguage);
  const languagesPromise = fetchLanguages();
  const navbarItemsPromise = fetchNavbar(props.currentLanguage);
  const sessionPromise = getServerSession(authOptions);

  const [languages, navbarItems, session] = await Promise.all([languagesPromise, navbarItemsPromise, sessionPromise]);
  

  const navbarItemsFake = JSON.parse(`[{"id":1,"component":"navbar","key":"products","translation":"Products","languageId":2},{"id":3,"component":"navbar","key":"login","translation":"Login","languageId":2},{"id":5,"component":"navbar","key":"contact","translation":"Contact","languageId":2},{"id":7,"component":"navbar","key":"basket","translation":"Basket","languageId":2}]`);
  const navbarItemsDictionary = parseDictionary(navbarItemsFake);
  // const LanguageIconComp : JSX.Element = await LanguageIcon({key:"language", nextLanguage:"HU-hu", currentLanguage: props.currentLanguage});

  return (
    <>
      <header className="bg-white border-gray-200 dark:bg-gray-900">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <Link href={`/${props.currentLanguage}/products/`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">{navbarItemsDictionary.get("products")}</Link>
            <Link href={`/${props.currentLanguage}/basket/`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">{navbarItemsDictionary.get("basket")}</Link>
            <Link href={`/${props.currentLanguage}/contact/`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">{navbarItemsDictionary.get("contact")}</Link>
            <LoginButton session={session} />
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {
              languages.map((language : any, index : number) => (
                <LanguageIcon key={"language" + index} nextLanguage={language} currentLanguage={props.currentLanguage} />
              ))
            }

            <ToggleDarkMode />
          </div>
        </nav>
        
      </header>
    </>
  );
}

export default NavBar;