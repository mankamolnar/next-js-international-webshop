const fetchLanguages = async () => {
  const rawData = await fetch(`${process.env.API_DOMAIN}api/get-languages`);
  return await rawData.json();
}

const fetchNavbar = async (language : string) => {
  const rawData = await fetch(`${process.env.API_DOMAIN}api/get-dictionary?language=${language}&component[0]=navbar`);
  return await rawData.json();
}

const NavBar = async (props : any) => {
  const languagesPromise = fetchLanguages();
  const navbarItemsPromise = fetchNavbar(props.currentLanguage);

  const [languages, navbarItems] = await Promise.all([languagesPromise, navbarItemsPromise]);

  console.log(languages, navbarItems);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              navbarItems.map((navbarItem : any, index : number) => (
                <li key={"navbarItem"+index} className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">{navbarItem.translation}</a>
                </li>
              ))
            }
          </ul>
          <form className="d-flex">
            gobmok
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;