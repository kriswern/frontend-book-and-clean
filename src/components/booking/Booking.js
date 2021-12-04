import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";

export default function Booking({item}) { 







  return (<div className="p-2 booking-container">
    <p>{item.description}</p>
    <p>{item.address}</p>
    <p>{item.date}</p>
    <p>{item.time}</p>
    <p>{item.status}</p>








  </div>)
}