import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";

export default function AdminBooking(props) {
  const inititalState = {
    bookingId: props.item.id,
    cleanerId: "",
  };

  const [cleaners, setCleaners] = useState();
  const [formData, setFormData] = useState(inititalState);

  useEffect(() => {
    Adminservice.getAllCleaners().then((response) => {
      setCleaners(response.data);
    });
  }, []);

  const deleteBooking = () => {
    BookingService.deleteBooking(props.item.id, props.role);
    props.deleteBooking(props.item.id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, cleanerId: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Adminservice.assignCleaner(formData);
    props.updateBookings(true);
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
      {props.item.cleanerId === null && (
        <form className="select-cleaner-container" onSubmit={handleSubmit}>
          <label>
            <b>Cleaner: </b>
          </label>
          <div>
            <select onChange={handleChange} className="custom-select" required>
              <option defaultValue=""></option>
              {cleaners &&
                cleaners.map((cleaner, index) => (
                  <option key={index} value={cleaner.id}>
                    {cleaner.id + " " + cleaner.name}
                  </option>
                ))}
            </select>

            <button type="submit" className="btn-sm btn-primary">
              Assign
            </button>
          </div>
        </form>
      )}

      <button className="btn btn-primary" onClick={deleteBooking}>
        Delete booking
      </button>
    </div>
  );
}
