export default function UserNav({
  navOpen,
  openOrCloseNav,
  changeTab,
  tabsRoute,
}) {
  //will map a array of values to buttons

  if (navOpen) {
    return (
      <aside className="customerNav">
        <button
          className="menu-button"
          type="button"
          onClick={() => openOrCloseNav()}
        >
          -
        </button>
        <ul className="customerNavList">
          {Array.from(tabsRoute.keys()).map((key, value) => (
            <li className="listItem">
              <button
              className="menu-button"
                onClick={() => {
                  changeTab(key);
                  openOrCloseNav();
                }}
              >
                {key}
              </button>
            </li>
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
