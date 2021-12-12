import { useEffect, useState } from "react/cjs/react.development";

import "../../../../css/customerBilling.css";


export default function CustomerBilling({

  
}) {
  const [allCustomers, setAllCustomers] = ([
    "fredrik","emil"
  ])
  const priceList = new Map([
    ["floorCleaning", 100],
    ["houseCleaning", 359],
  ])

  const [searchInput, setSearchInput] = useState();
  const [cartBookings, setCartBookings] = useState({ bookings: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeCustomer, setActiveCustomer] = useState();
  const [activeCustomerFinishedBookings, setActiveCustomerFinishedBookings] =
    useState([
      {
        description: "Clean mansion",
        date: "15/22",
        time: "13:00",
        cleaner: "john alliway",
        status: "confirmed",
        cleaningType: "floorCleaning",
        id: 1,
      },
      {
        description: "Clean mansion",
        date: "15/22",
        time: "13:00",
        cleaner: "john alliway",
        status: "confirmed",
        cleaningType: "houseCleaning",
        id: 2,
      },
      {
        description: "Clean mansion",
        date: "15/22",
        time: "13:00",
        cleaner: "john alliway",
        status: "confirmed",
        cleaningType: "floorCleaning",
        id: 3,
      },
      {
        description: "Clean mansion",
        date: "15/22",
        time: "13:00",
        cleaner: "john alliway",
        status: "confirmed",
        cleaningType: "houseCleaning",
        id: 4,
      },
      {
        description: "Clean mansion",
        date: "15/22",
        time: "13:00",
        cleaner: "john alliway",
        status: "confirmed",
        cleaningType: "houseCleaning",
        id: 5,
      },
    ]);
  useEffect(() => { // keeps cart price updated
    let total = 0;
    cartBookings.bookings.map((booking) => {
      total += priceList.get(booking.cleaningType);
      
     
    });

    setTotalPrice(total);
  }, [cartBookings]);
  function changeActiveCustomer(user) {
    setSearchInput(""); // resets input when customer is selected
    setActiveCustomer(user);
  }
  function handleSearchInput() {
    if (activeCustomer) setActiveCustomer(); //resets to searching if customer has been picket

    const currentInputVal = document.getElementById("searchInput").value;
    setSearchInput(currentInputVal);
  }

  function addToCart(bookingId) {
    const bookingToMove = activeCustomerFinishedBookings.find(
      (booking) => {
        return booking.id === bookingId;
      }
    );
    setActiveCustomerFinishedBookings(
      activeCustomerFinishedBookings.filter(
        (booking) => booking.id !== bookingId
      )
    );

    setCartBookings((cartBookings) => ({
      bookings: [...cartBookings.bookings, bookingToMove],
    }));
  }

  function reseCustomerData() {
    // this will reset evrything makign you have to get new data only called when something new is searched for
    setTotalPrice(0);
    setActiveCustomer();
    setActiveCustomerFinishedBookings();
  }
  return (
    <div className="mainWindow">
      <div className="test">
        <div className="test2">
          <h2>Enter Customer</h2>
          {activeCustomer ? (
            <div className="billTotal">
              <h3>Total</h3>
              <button>
                <p>{totalPrice}:-</p>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <input
          className="nameSearchInput"
          type="search"
          id="searchInput"
          name="search"
          aria-label="Search through site content"
          value={searchInput}
          onChange={() => handleSearchInput()}
        />
        {activeCustomer ? (
          activeCustomerFinishedBookings.map((data) => {
            return (
              <div class="bookingCard">
                <div className="cardInfo">
                  <h2>{data.description}</h2>
                  <p>
                    {data.date} : {data.time}
                  </p>
                  <p>
                    Cleaner:{data.cleaner} Status:{data.status}
                  </p>
                </div>
                <div>
                  <button onClick={() => addToCart(data.id)}>
                    {priceList.get(data.cleaningType)}:->
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="nameListWindow">
            {allCustomers
              .filter((name) => name.includes(searchInput))
              .map((name) => {
                return (
                  <button onClick={() => changeActiveCustomer(name)}>
                    {name}
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
