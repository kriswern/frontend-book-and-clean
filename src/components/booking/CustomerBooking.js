import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import DateService from "../../services/DateService";

export default function CustomerBooking(props) {
  const [active, setActive] = useState();

  useEffect(() => {
   
    //Needs to be atleast 24 hours for the customer to cancel booking
    props.item && setActive(DateService.isDateNewer(props.item.date, 24));
}, [props]);

  const deleteBooking = () => {
    BookingService.deleteBooking(props.item.id, props.role)
    props.updateBookings(true);
  }

  return (
    <div className="booking-container">
      <p>
        <b>Name:</b> {props.item.description}
      </p>
      <p>
        <b>Address:</b> {props.item.address}
      </p>
      <p>
        <b>Date:</b> {props.item.date}
      </p>
      <p>
        <b>Time:</b> {props.item.time}
      </p>
      <p>
        <b>Status:</b> {props.item.status}
      </p>
      {active && <button className="btn btn-primary" onClick={deleteBooking}>Delete booking</button>}
    </div>
  );
}