import { useEffect, useState } from "react";
import "../../css/booking.css";
import DateService from "../../services/DateService";

export default function CleanerBooking(props) {
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
      {props.item.status === "Confirmed" && active && (
        <button className="btn btn-primary">Accept booking</button>
      )}
    </div>
  );
}
