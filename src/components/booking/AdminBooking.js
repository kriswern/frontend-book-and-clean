import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";
import { AiOutlineClose } from "react-icons/ai";
import DateService from "../../services/DateService";

export default function AdminBooking(props) {
  const inititalState = {
    bookingId: "",
    cleanerId: "",
  };

  const [cleaners, setCleaners] = useState();
  const [formData, setFormData] = useState(inititalState);
  const [cleanerName, setCleanerName] = useState("");
  const [booking, setBooking] = useState();
  const [active, setActive] = useState();

  useEffect(() => {
    if (active === undefined && booking) {
      setActive(DateService.isDateNewer(booking.date, 12));
    }
  }, [booking, active]);

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
    setBooking(props.item);
  }, [props]);

  useEffect(() => {
    booking !== undefined &&
      formData.bookingId === "" &&
      setFormData({ ...formData, bookingId: booking.id });
  }, [booking, formData]);

  const deleteBooking = () => {
    BookingService.deleteBooking(booking.id, props.role);
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
  };

  const removeCleaner = () => {
    Adminservice.removeCleaner(booking.id);
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
      {props.item.cleanerId === null && active ? (
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
      ):(<div className="cleaner-name-container">
      <p>
        <b>Cleaner:</b> {cleanerName}
      </p>
      {active && (
        <button className="btn-remove-cleaner" onClick={removeCleaner}>
          <AiOutlineClose />
        </button>
      )}
    </div>)}
      

      {active && (
        <button className="btn btn-primary" onClick={deleteBooking}>
          Delete booking
        </button>
      )}
    </div>
  );
}
