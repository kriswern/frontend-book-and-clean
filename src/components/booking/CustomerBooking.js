import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import DateService from "../../services/DateService";

export default function CustomerBooking(props) {
  const [booking, setBooking] = useState()
  const [active, setActive] = useState();

  useEffect(() => {

    if(active === undefined && booking) {
      setActive(DateService.isDateNewer(booking.date))
    }}
  , [booking, active]);

  useEffect(() => {
    setBooking(props.item)
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
      <button className="btn btn-primary" onClick={deleteBooking}>Delete booking</button>
    </div>
  );
}