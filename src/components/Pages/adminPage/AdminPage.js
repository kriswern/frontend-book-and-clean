
import { useState } from "react";
import UserNav from "../userNav";
import "../../../css/userPage.css";
import "../../../css/userNav.css";
import AllBookings from "../customerPage/AllBookingsTab";
export default function AdminPage() {
  const tabsRoute = new Map([
    // add new tabs here
    ["All Bookings", AllBookings],
  ]);

  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(AllBookings);

  function openOrCloseNav() {
    navOpen === false ? setNavOpen(true) : setNavOpen(false);
  }
  function changeTab(tab) {
    tabsRoute.has(tab)
      ? setActiveTab(tabsRoute.get(tab))
      : setActiveTab(AllBookings); // all bookings are default
  }
  return (
    <div className="pageWrapper">
      <UserNav
        navOpen={navOpen}
        openOrCloseNav={openOrCloseNav}
        changeTab={changeTab}
        tabsRoute={tabsRoute}
      />
      <div className="activeTabWindow">{activeTab}</div>
    </div>
  );
}
