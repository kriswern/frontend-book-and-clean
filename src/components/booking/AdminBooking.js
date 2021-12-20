import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import DateService from "../../services/DateService";
import { BsInfoSquare } from "react-icons/bs";

export default function AdminBooking(props) {
  const inititalState = {
    bookingId: "",
    cleanerId: "",
  };

  const [cleaners, setCleaners] = useState();
  const [formData, setFormData] = useState(inititalState);
  const [cleanerName, setCleanerName] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    props.item && setActive(DateService.isDateNewer(props.item.date, 12));
  }, [props]);

  useEffect(() => {
    active && setFormData({ bookingId: props.item.id });
  }, [active, props]);

  useEffect(() => {
    Adminservice.getAllCleaners().then((response) => {
      setCleaners(response.data);
    });
  }, []);

  useEffect(() => {
    props.item.cleanerId &&
      Adminservice.getCleanerName(props.item.cleanerId).then((response) => {
        setCleanerName(response.data);
      });
  }, [props]);

  useEffect(() => {
    props.item &&
      formData.bookingId === "" &&
      setFormData({ ...formData, bookingId: props.item.id });
  }, [props, formData]);

  const deleteBooking = () => {
    BookingService.deleteBooking(props.item.id, props.role);
    props.updateBookings(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, cleanerId: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formdata: ", formData);
    Adminservice.assignCleaner(formData);
    props.updateBookings(true);
    setFormData(inititalState);
  };

  const removeCleaner = () => {
    setFormData(inititalState);
    Adminservice.removeCleaner(props.item.id);
    props.updateBookings(true);
  };

  const showFeedback = () => {
    alert("Feedback: \n" + props.item.feedback);
  };

  return (
    <div className="booking-container">
      <h5 className="booking-header">
        <span>{props && props.item.priceList.type}</span>
        <span className="booking-price">
          {props && props.item.priceList.price}:-
        </span>
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
        <b>Status:</b>{" "}
        {props.item.status !== "Rejected" ? (
          props.item.status
        ) : (
          <span className="status-rejected-container">
            <span>{props.item.status}</span>
            <button className="btn-rejected-info" onClick={showFeedback}>
              <BsInfoSquare />
            </button>
          </span>
        )}
      </p>
      {props.item.cleanerId === null && active ? (
        <form className="select-cleaner-container" onSubmit={handleSubmit}>
          <label>
            <b>Cleaner: </b>
          </label>
          <div className="select-cleaner">
            <select onChange={handleChange} className="custom-select" required>
              <option></option>
              {cleaners &&
                cleaners.map((cleaner, index) => (
                  <option key={index} value={cleaner.id}>
                    {cleaner.name}
                  </option>
                ))}
            </select>

            <button type="submit" className="btn-add-cleaner">
              <AiOutlinePlus />
            </button>
          </div>
        </form>
      ) : (
        <div className="cleaner-name-container">
          <p>
            <b>Cleaner:</b> {props.item.cleanerId && cleanerName}
          </p>
          {active && (
            <button className="btn-remove-cleaner" onClick={removeCleaner}>
              <AiOutlineClose />
            </button>
          )}
        </div>
      )}

      {active && (
        <div className="d-grid gap-2">
          <button className="btn btn-warning btn-sm" onClick={deleteBooking}>
            Delete booking
          </button>
        </div>
      )}
    </div>
  );
}
