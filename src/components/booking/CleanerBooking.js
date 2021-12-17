import CleanerService from "../../services/CleanerService";
import { useEffect, useState } from "react";
import "../../css/booking.css";
import DateService from "../../services/DateService";

export default function CleanerBooking(props) {
  const [active, setActive] = useState();

  useEffect(() => {
    props.item && setActive(DateService.isDateNewer(props.item.date, 12));
  }, [props]);

  const changeStatus = () => {
    console.log("id :", props.item.id);
    console.log("status :", props.item.status);
    CleanerService.changeStatus(props.item.id)
      .then((response) => {
        if (response.status === 200) {
          props.updateBookings(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const confirmChange = () => {
    let text;
    if (props.item.status === "Confirmed") {
      text =
        "Please confirm the following information:\n\n" +
        props.item.description +
        "\n" +
        props.item.address +
        "\n\n" +
        props.item.date +
        "\n" +
        props.item.time +
        "\n";
    } else if (props.item.status === "In progress") {
      text = "\nPlease confirm to mark it as done.\n";
    }
    if (window.confirm(text)) {
      changeStatus();
    }
  };

  return (
    <div className="booking-container">
      <h5 className="booking-header">
        <span>{props.item.priceList.type}</span>
        <span className="booking-price">{props.item.priceList.price}:-</span>
      </h5>
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
        {props.item.status === "In progress" && (
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-sm"
              value={props.item.id}
              onClick={confirmChange}
            >
              Done
            </button>
          </div>
        )}
      </div>
      {props.item.status === "Confirmed" && active && (
        <div className="d-grid gap-2">
          <button className="btn btn-success btn-sm" onClick={confirmChange}>
            Accept Booking
          </button>
        </div>
      )}
    </div>
  );
}
