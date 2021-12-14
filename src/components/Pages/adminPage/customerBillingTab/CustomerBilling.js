import { useEffect, useState } from "react/cjs/react.development";

import "../../../../css/customerBilling.css";
import Adminservice from "../../../../services/Adminservice";

export default function CustomerBilling() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [pricetest, setPriceTest] = useState();
  const [searchInput, setSearchInput] = useState();
  const [cartBookings, setCartBookings] = useState({ bookings: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeCustomer, setActiveCustomer] = useState();
  const [activeBookings, setActiveBookings] = useState();

  useEffect(() => { //fetches price lists
    Adminservice.getPriceList()
      .then((response) => {
        setPriceTest(response.data);
      })
      .then(console.log(pricetest));
  }, []);

  useEffect(() => { // fetches all customers
   
    Adminservice.getAllCustomers().then((response) => {setAllCustomers(response.data);});
  }, []);

  useEffect(() => {// handles updating carts total price
    if (cartBookings !== undefined) {
      let total = 0;
      cartBookings.bookings.map((booking) => {
        total += booking.priceList.price;
      });

      setTotalPrice(total);
    }
  }, [cartBookings]);

  useEffect(() => { // filters out customers bookings (id,status=done)
    if (activeCustomer !== undefined) {
      Adminservice.getAllBookings().then((response) => {
        let data = response.data;
        data = data.filter(
          (data) =>
            data.customerId === activeCustomer.id && data.status === "done"
        );
        setActiveBookings(data);
      });
    }
  }, [activeCustomer]);
  
  function changeActiveCustomer(user) {
    setSearchInput(""); // resets input when customer is selected
    setActiveCustomer(user);
  }
  function handleSearchInput() {
    if (activeCustomer) reseCustomerData(); //resets to searching if customer has been picket

    const currentInputVal = document.getElementById("searchInput").value;
    setSearchInput(currentInputVal);
  }

  function addToCart(bookingId) {
    const bookingToMove = activeBookings.find((booking) => {
      return booking.id === bookingId;
    });
    setActiveBookings(
      activeBookings.filter((booking) => booking.id !== bookingId)
    );

    setCartBookings((cartBookings) => ({
      bookings: [...cartBookings.bookings, bookingToMove],
    }));
  }
function sendBill(){
  if(totalPrice>0){
    console.log(totalPrice);
    console.log(activeCustomer.id);
    Adminservice.sendBill(totalPrice,activeCustomer.id)
  }
}
  function reseCustomerData() {// resets all data for new search
    setTotalPrice(0);
    setActiveCustomer();
    setActiveBookings();
    setCartBookings({ bookings: [] });
  }

  return (
    <div className="mainWindow">
      <div className="test">
        <div className="test2">
          <h2>Enter Customer</h2>
          {activeCustomer ? (
            <div className="billTotal">
              <h3>Total</h3>
              <button onClick={() => {sendBill()}}>
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
          activeBookings ? (
            activeBookings.map((data) => {
              return (
                <div class="bookingCard">
                  <div className="cardInfo">
                    <h2>{data.description}</h2>
                    <p>
                      {data.date} : {data.time}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => addToCart(data.id)}>
                      {data.priceList.price}:->
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )
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
