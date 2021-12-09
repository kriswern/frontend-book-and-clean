import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import Booking from "./Booking";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";
import CustomerService from "../../services/CustomerService";
import CleanerService from "../../services/CleanerService";

export default function Bookings() {
  const [bookings, setBookings] = useState();
  const [role, setRole] = useState("admin");

  useEffect(() => {
    const getBookings = () => {
      switch (role) {
        case "admin":
          Adminservice.getAllBookings().then((response) => {
            setBookings(response.data);
            console.log(response.data);
          });
          break;
        case "customer":
          //WE NEED THE CUSTOMER ID HERE TO PASS IN getMyBookings
          CustomerService.getMyBookings(1).then((response) => {
            setBookings(response.data);
            console.log(response.data);
          });
          break;
        case "cleaner":
          //WE NEED THE CLEANER ID HERE TO PASS IN getMyBookings
          CleanerService.getMyBookings(1).then((response) => {
            setBookings(response.data);
            console.log(response.data);
          });
          break;

        default:
          break;
      }
    };
    getBookings();
  }, []);

  const updateBookings = (id) => {
    console.log(id);
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  return (
    <div className="p-2">
      <h4 className="newbooking-header">Bookings</h4>

      <div className="bookings-container p-2">
        {bookings &&
          bookings.map((booking, index) => (
            <Booking
              key={index}
              item={booking}
              deleteBooking={updateBookings}
              role={role}
            />
          ))}
      </div>
    </div>
  );
}
