import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../css/userNav.css"

export default function UserNav({ routes }) {
  const history = useHistory();
  
  const [navOpen, setNavOpen] = useState(false);
 
  function openOrCloseNav() {
    navOpen === false ? setNavOpen(true) : setNavOpen(false);
  }

  const logOut = () => {
    localStorage.removeItem("access_token")
    openOrCloseNav()
    history.push('/login')
  }

  if (navOpen) {
    return (
      <aside className="customerNav">
        <button
          className="custNavButton"
          type="button"
          onClick={() => openOrCloseNav()}
        >
          -
        </button>
        <ul className="customerNavList">
          {routes && routes.map((route, index) => (
            <Link key={index} to={route.path} className="list-item"><button className="menu-button list-item">{route.name}</button></Link>
            
          ))}
          <br/>
          <li className="list-item"><button className="menu-button list-item" onClick={logOut}>Logout</button></li>
        </ul>
      </aside>
    );
  } else {
    return (
      <aside className="customerNav">
        <button
          className="custNavButton"
          type="button"
          onClick={() => openOrCloseNav()}
        >
          ---
        </button>
      </aside>
    );
  }
}
