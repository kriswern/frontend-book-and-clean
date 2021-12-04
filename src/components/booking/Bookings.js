import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import Booking from "./Booking";

export default function Bookings() {
  const [bookings, setBookings] = useState();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    BookingService.getAllBookings().then((response) => {
      setBookings(response.data);
      console.log(response.data);
    });
  };

  return (
    <div className="p-2">
      <h4 className="newbooking-header">Bookings</h4>

      <div className="bookings-container p-2">
        {bookings &&
          bookings.map((booking, index) => (
            <Booking key={index} item={booking} />
          ))}
      </div>
    </div>
  );
}
