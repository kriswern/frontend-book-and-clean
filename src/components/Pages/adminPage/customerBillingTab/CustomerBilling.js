import { useEffect, useState } from "react/cjs/react.development";

import "../../../../css/customerBilling.css";
import Adminservice from "../../../../services/Adminservice";
import CustomerNameList from "../customerNameList";

export default function CustomerBilling() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [bookingsInCart, setBookingsInCart] = useState({ bookings: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeCustomer, setActiveCustomer] = useState();
  const [activeBookings, setActiveBookings] = useState();

  

  useEffect(() => { // fetches all customers
   
    getAllCustomers();
  }, []);

  useEffect(() => {// handles updating carts total price
    
      let total = 0;
      bookingsInCart.bookings.map((booking) => {
        total += booking.priceList.price;
      });
      setTotalPrice(total);
    
  }, [bookingsInCart]);

  useEffect(() => { // filters out customers bookings (id,status=done)
    if (activeCustomer !== undefined) {
      setActiveBookings(activeCustomer.bookings.filter((booking) => booking.status === "done" && booking.billed === false));
    }
  }, [activeCustomer]);
  
  function getAllCustomers(){
    Adminservice.getAllCustomers().then((response) => {setAllCustomers(response.data);});
  }
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
    setBookingsInCart((bookingsInCart) => ({
      bookings: [...bookingsInCart.bookings, bookingToMove],
    }));
    setActiveBookings(
      activeBookings.filter((booking) => booking.id !== bookingId)
    );

    
  }
function sendBill(){
  if(totalPrice>0){
    console.log(totalPrice);
    console.log(activeCustomer.id);
    Adminservice.addBill(totalPrice,activeCustomer.id).then((response) =>{
      if(response.data){
        // maby send bill to email ? but either way update booking
       updateBookingBilledStatus()
      }
    })
    
  }
}
function updateBookingBilledStatus() {
  const bookingIds = [];
 
  bookingsInCart.bookings.forEach(booking => {
    bookingIds.push(booking.id)
  });
  
  Adminservice.updateBookingsBilledStatus(bookingIds).then(() =>{

    reseCustomerData()
    getAllCustomers()
  }
 

  );
  
  //need to update all bookings in cart to billed here;
}
  function reseCustomerData() {// resets all data for new search
    setTotalPrice(0);
    setActiveCustomer();
    setActiveBookings();
    setBookingsInCart({ bookings: [] });
  }
console.log(activeCustomer);
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
          <CustomerNameList 
            allCustomers={allCustomers}
            changeActiveCustomer = {changeActiveCustomer}
            searchInput = {searchInput}>

          </CustomerNameList>
          
        )}
      </div>
    </div>
  );
}
