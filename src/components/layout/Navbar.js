import "../../css/Layout.css";

export default function Navbar() {
  return (
    <nav className="nav p-2">
      <h2 className="bookIcon">Städa fint</h2>
      <ul className="navList">
        <li className="link-primary navlistItem">
          <button className="menu-button">
            <a className="nav-link">home</a>
          </button>
        </li>
        <li className="link-primary navlistItem">
          <button className="menu-button">
            <a className="nav-link test">admin</a>
          </button>
        </li>
        <li className="link-primary navlistItem">
          <button className="menu-button">
            <a className="nav-link">placeholder</a>
          </button>
        </li>
      </ul>
    </nav>
  );
}
