import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";

//We need to know what type of user (cleaner/admin/customer)

export default function CleanerBooking(props) {
  console.log("item:" + props.item);

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
      {props.item.staus === "pending" && (
        <button className="btn btn-primary">Accept booking</button>
      )}
    </div>
  );
}
