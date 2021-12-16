import CleanerService from "../../services/CleanerService";
import { useEffect, useState } from "react";
import "../../css/booking.css";
import DateService from "../../services/DateService";

export default function CleanerBooking(props) {
  const [active, setActive] = useState();

  useEffect(() => {
    props.item && setActive(DateService.isDateNewer(props.item.date, 12));
  }, [props]);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    CleanerService.changeStatusToDone(e.target.value)
      .then((response) => {
        if (response.status === 200) {
          props.updateBookings(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

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
      <div>
        {props.item.status === "Booked" && (
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-sm"
              value={props.item.id}
              onClick={handleStatusChange}
            >
              Done
            </button>
          </div>
        )}
      </div>
      {props.item.status === "Confirmed" && active && (
        <div className="d-grid gap-2">
          <button className="btn btn-success btn-sm">Accept Booking</button>
        </div>
      )}
    </div>
  );
}
