import { useEffect, useState } from "react/cjs/react.development";

import "../../../../css/customerBilling.css";
import Adminservice from "../../../../services/Adminservice";
import CustomerNameList from "../customerNameList";

export default function CustomerBilling({ logout }) {
  const [allCustomers, setAllCustomers] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [bookingsInCart, setBookingsInCart] = useState({ bookings: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeCustomer, setActiveCustomer] = useState();
  const [activeBookings, setActiveBookings] = useState();

  useEffect(() => {
    // fetches all customers

    getAllCustomers();
  }, []);

  useEffect(() => {
    // handles updating carts total price

    let total = 0;
    bookingsInCart.bookings.forEach((booking) => {
      total += booking.priceList.price;
    });
    setTotalPrice(total);
  }, [bookingsInCart]);

  useEffect(() => {
    // filters out customers bookings (id,status=Approved)
    if (activeCustomer !== undefined) {
      let filteredBookings = activeCustomer.bookings.filter(
        (booking) => booking.status === "Approved"
      );
      filteredBookings.length > 0
        ? setActiveBookings(filteredBookings)
        : setActiveBookings(undefined);
    }
  }, [activeCustomer]);

  function getAllCustomers() {
    Adminservice.getAllCustomers().then((response) => {
      setAllCustomers(response.data);
    }).catch(error => logout(true));
  }
  function changeActiveCustomer(user) {
    setSearchInput(""); // resets input when customer is selected
    setActiveCustomer(user);
  }
  function handleSearchInput(e) {
    if (activeCustomer) reseCustomerData(); //resets to searching if customer has been picket
    setSearchInput(e.target.value);
  }

  function addToCart(bookingId) {
    setBookingsInCart((bookingsInCart) => ({
      bookings: [
        ...bookingsInCart.bookings,
        activeBookings.find((booking) => {
          return booking.id === bookingId;
        }),
      ],
    }));
    setActiveBookings(
      activeBookings.filter((booking) => booking.id !== bookingId)
    );
  }
  function sendBill() {
    if (totalPrice > 0) {
      const bookingIds = bookingsInCart.bookings.map((booking) => {
        return booking.id;
      });
      Adminservice.addBill(totalPrice, activeCustomer.id, bookingIds).then(
        (response) => {
          if (response.data) {
            // maby send bill to email ? but either way update booking
            updateBookingBilledStatus();
          }
        }
      ).catch(error => logout(true));
    }
  }
  function updateBookingBilledStatus() {
    const bookingIds = [];

    bookingsInCart.bookings.forEach((booking) => {
      bookingIds.push(booking.id);
    });

    Adminservice.updateBookingsBilledStatus(bookingIds).then(() => {
      reseCustomerData();
      getAllCustomers();
    }).catch(error => logout(true));

    //need to update all bookings in cart to billed here;
  }
  function reseCustomerData() {
    // resets all data for new search
    setTotalPrice(0);
    setActiveCustomer();
    setActiveBookings();
    setBookingsInCart({ bookings: [] });
  }
  return (
    <div className="mainWindow">
      <div className="searchWindow">
        {activeCustomer && (
          <div className="billTotal">
            <h3>Total</h3>
            <button
              onClick={() => {
                sendBill();
              }}
            >
              <p>{totalPrice}:-</p>
            </button>
          </div>
        )}

        <div className="test2">
          {activeCustomer ? (
            <h2>{activeCustomer.name}</h2>
          ) : (
            <h2>Enter Customer</h2>
          )}
        </div>

        <input
          className="nameSearchInput"
          type="search"
          id="searchInput"
          name="search"
          aria-label="Search through site content"
          value={searchInput}
          onChange={(e) => handleSearchInput(e)}
        />

        {activeCustomer ? (
          activeBookings ? (
            activeBookings.map((data, index) => {
              return (
                <div class="bookingCard" key={index}>
                  <div className="cardInfo">
                    <h2>{data.description}</h2>
                    <p>
                      {data.date} : {data.time}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => addToCart(data.id)}>
                      {data.priceList.price}:-
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <br></br>
              <h2>No bookings to bill</h2>
            </div>
          )
        ) : (
          <CustomerNameList
            allCustomers={allCustomers}
            changeActiveCustomer={changeActiveCustomer}
            searchInput={searchInput}
          ></CustomerNameList>
        )}
      </div>
    </div>
  );
}
