import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";
import {AiOutlineClose} from "react-icons/ai"

export default function AdminBooking(props) {
  const inititalState = {
    bookingId: props.item.id,
    cleanerId: "",
  };

  const [cleaners, setCleaners] = useState();
  const [formData, setFormData] = useState(inititalState);
  const [cleanerName, setCleanerName] = useState("")

  useEffect(() => {
    Adminservice.getAllCleaners().then((response) => {
      setCleaners(response.data);
    });
  }, []);

  useEffect(() => {
    props.item.cleanerId &&
    Adminservice.getCleanerName(props.item.cleanerId).then((response) => {
      setCleanerName(response.data)
    })
  }, [props]);

  const deleteBooking = () => {
    BookingService.deleteBooking(props.item.id, props.role);
    props.updateBookings(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, cleanerId: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Adminservice.assignCleaner(formData);
    props.updateBookings(true);
  };

  const removeCleaner = () => {
    Adminservice.removeCleaner(props.item.id);
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
      {props.item.cleanerId === null ? (
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
      ) : <div className="cleaner-name-container"><p>
      <b>Cleaner:</b> {cleanerName}
    </p><button className="btn-remove-cleaner" onClick={removeCleaner}><AiOutlineClose /></button></div>}

      <button className="btn btn-primary" onClick={deleteBooking}>
        Delete booking
      </button>
    </div>
  );
}
