import useLocale from "../custom_hooks/useLocale";
import Link from "next/link";
import LanguageIcon from "./LanguageIcon";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

const fetchLanguages = async () => {
  const rawData = await fetch(`${process.env.API_DOMAIN}api/get-languages`);
  return await rawData.json();
}

const fetchNavbar = async (language : string) => {
  const rawData = await fetch(`${process.env.API_DOMAIN}api/get-dictionary?language=${language}&component[0]=navbar`);
  return await rawData.json();
}

const NavBar = async (props : any) => {
  const { parseDictionary } = useLocale(props.currentLanguage);
  const languagesPromise = fetchLanguages();
  const navbarItemsPromise = fetchNavbar(props.currentLanguage);
  const sessionPromise = getServerSession(authOptions);

  const [languages, navbarItems, session] = await Promise.all([languagesPromise, navbarItemsPromise, sessionPromise]);
  const navbarItemsDictionary = parseDictionary(navbarItems);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link href={`/${props.currentLanguage}/products/`} className="nav-link active" aria-current="page">{navbarItemsDictionary.get("products")}</Link>
            </li>

            <li className="nav-item">
              <Link href={`/${props.currentLanguage}/basket/`} className="nav-link active" aria-current="page">{navbarItemsDictionary.get("basket")}</Link>
            </li>

            <li className="nav-item">
              <Link href={`/${props.currentLanguage}/contact/`} className="nav-link active" aria-current="page">{navbarItemsDictionary.get("contact")}</Link>
            </li>

            <li className="nav-item">
              <LoginButton session={session} />
            </li>

          </ul>
          <form className="d-flex">
            {
              languages.map((language : any, index : number) => (
                <LanguageIcon key={"language" + index} nextLanguage={language} currentLanguage={props.currentLanguage} />
              ))
            }
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;