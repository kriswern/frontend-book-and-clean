import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";

//We need to know what type of user (cleaner/admin/customer)

export default function Booking(props) {
  console.log("item:" + props.item)

  const deleteBooking = () => {
    BookingService.deleteBooking(props.item.id)
    props.deleteBooking(props.item.id)
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
      {props.role !== "cleaner" && <button className="btn btn-primary" onClick={deleteBooking}>Delete booking</button>}
    </div>
  );
}
