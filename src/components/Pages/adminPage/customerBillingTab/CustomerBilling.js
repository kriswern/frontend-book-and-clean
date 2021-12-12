import { useEffect, useState } from "react/cjs/react.development";

import "../../../../css/customerBilling.css";
import Adminservice from "../../../../services/Adminservice";

export default function CustomerBilling() {
  const [allCustomers, setAllCustomers] = useState([]);
  const priceList = new Map([
    ["floorCleaning", 100],
    ["houseCleaning", 359],
  ]);
  const [pricetest, setPriceTest] = useState();
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
    useEffect (() =>{
      Adminservice.getPriceList().then((response) => {
        setPriceTest(response.data);
        
      }).then(console.log(pricetest))
    },[])
  useEffect(() => {
    //get all customers here name / id ? whateever is needed to get  bookings
    Adminservice.getAllCustomers().then((response) => {
      // gets all customers
      setAllCustomers(response.data);
    });
  }, []);

  useEffect(() => {
    // keeps cart price updated
    let total = 0;
    console.log(pricetest)
    cartBookings.bookings.map((booking) => {
     
      total += getBookingPrice(booking.cleaningType);
    });

    setTotalPrice(total);
  }, [cartBookings]);

  useEffect(() =>{//get customers bookings 

  },[activeCustomer])
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
    const bookingToMove = activeCustomerFinishedBookings.find((booking) => {
      return booking.id === bookingId;
    });
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

  function getBookingPrice (bookingType) {

    const price = pricetest.filter((priceType) =>priceType.type === bookingType )
    return price[0].price;

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
                    {getBookingPrice(data.cleaningType)}:->
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="nameListWindow">
            {allCustomers
              .filter((customer) => customer.name.includes(searchInput))
              .map((customer) => {
                return (
                  <button onClick={() => changeActiveCustomer(customer)}>
                    {customer.name}
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
