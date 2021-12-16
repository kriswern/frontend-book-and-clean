import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import DateService from "../../services/DateService";
import CustomerService from "../../services/CustomerService";
import Complaint from "./Complaint";

export default function CustomerBooking(props) {
  const [active, setActive] = useState();
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    //Needs to be atleast 24 hours for the customer to cancel booking
    props.item && setActive(DateService.isDateNewer(props.item.date, 24));
  }, [props]);

  const approveOrRejectCleaning = (e) => {
    const approved = e.target.value;
    console.log(approved);

    if (approved === "true") {
      CustomerService.approveCleaning(props.item.id)
        .then((response) => {
          if (response.status === 200) {
            props.updateBookings(true);
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    } else {
      setRejected(true);
    }
  };

  const deleteBooking = () => {
    BookingService.deleteBooking(props.item.id, props.role);
    props.updateBookings(true);
  };

  const update = (bool) => {
    props.updateBookings(bool);
    setTimeout(() => {
      setRejected(false);
    }, 100);
  };

  return rejected ? (
    <Complaint id={props.item.id} updateBookings={update} />
  ) : (
    <div>
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
        {active && (
          <div className="d-grid gap-2">
            <button className="btn btn-warning btn-sm" onClick={deleteBooking}>
              Delete booking
            </button>
          </div>
        )}
        {props.item.status === "Done" && (
          <div className="approve-cleaning-container">
            <button
              className="btn btn-success btn-sm btn-approve"
              value={true}
              onClick={approveOrRejectCleaning}
            >
              Approve Cleaning
            </button>
            <button
              className="btn btn-danger btn-sm btn-reject"
              onClick={approveOrRejectCleaning}
              value={false}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
