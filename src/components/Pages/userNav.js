import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/userNav.css";

export default function UserNav({ routes, logout }) {
  const [navOpen, setNavOpen] = useState(false);

  function openOrCloseNav() {
    navOpen === false ? setNavOpen(true) : setNavOpen(false);
  }

  const logoutButton = () => {
    openOrCloseNav();
    logout();
  };

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
          {routes &&
            routes.map((route, index) => (
              <Link key={index} to={route.path} className="list-item">
                <button
                  className="menu-button list-item"
                  onClick={() => openOrCloseNav()}
                >
                  {route.name}
                </button>
              </Link>
            ))}
          <br />
          <li className="list-item">
            <button className="menu-button list-item" onClick={logoutButton}>
              Logout
            </button>
          </li>
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
