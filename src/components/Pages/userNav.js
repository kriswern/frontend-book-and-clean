import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/userNav.css"

export default function UserNav({ routes }) {
  
  const [navOpen, setNavOpen] = useState(false);
 
  function openOrCloseNav() {
    navOpen === false ? setNavOpen(true) : setNavOpen(false);
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
