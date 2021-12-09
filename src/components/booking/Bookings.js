import { useEffect, useState } from "react";
import Booking from "./Booking";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";
import CustomerService from "../../services/CustomerService";
import CleanerService from "../../services/CleanerService";
import TokenService from "../../services/TokenService";
import AdminBooking from "./AdminBooking";

export default function Bookings() {
  const [bookings, setBookings] = useState();
  const [role, setRole] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log("in booking state")
   const role = TokenService.getRoleFromToken()
   if(role !== undefined){
     setRole(role)
   }
  }, [])

  useEffect(() => {
    const getBookings = () => {
      switch (role) {
        case "admin":
          console.log("in admin bookings")
          Adminservice.getAllBookings().then((response) => {
            setBookings(response.data);
          });
          break;
        case "customer":
          console.log("in costumer bookings")
          //WE NEED THE CUSTOMER ID HERE TO PASS IN getMyBookings
          CustomerService.getMyBookings().then((response) => {
            console.log(response)
            setBookings(response.data);
            console.log(response.data);
          }).catch((error) => {
            if(error.toJSON().status > 400){
              console.log("Access denied, error code: ", error.toJSON().status)
              //We need to delete token and force a refresh
            }

          });
          break;
        case "cleaner":
          //WE NEED THE CLEANER ID HERE TO PASS IN getMyBookings
          console.log("im here")
          CleanerService.getMyBookings().then((response) => {
            setBookings(response.data);
          });
          break;

        default:
          break;
      }
      setUpdate(false);
    };
    getBookings();
  }, [role]);

  const deleteBooking = (id) => {
    console.log(id);
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  useEffect(() => {
    console.log(update);
    setTimeout(() => {
      update &&
        Adminservice.getAllBookings().then((response) => {
          setBookings(response.data);
          console.log(response.data);
        });
    }, 500);
    setUpdate(false)
  }, [update]);

  const updateBookings = (bool) => {
    setUpdate(bool);
  };

  return (
    <div className="p-2">
      <h4 className="newbooking-header">Bookings</h4>

      <div className="bookings-container p-2">
        {bookings &&
          bookings.map((booking, index) =>
            role && role !== "admin" ? (
              <Booking
                key={index}
                item={booking}
                deleteBooking={deleteBooking}
                updateBookings={updateBookings}
                role={role}
              />
            ) : (
              <AdminBooking
                key={index}
                item={booking}
                deleteBooking={deleteBooking}
                updateBookings={updateBookings}
                role={role}
              />
            )
          )}
      </div>
    </div>
  );
}
