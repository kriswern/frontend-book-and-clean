import "../../css/complaint.css";
import { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";

const initialState = {
  bookingId: "",
  feedback: "",
};

export default function Complaint({ id, updateBookings }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    formData.bookingId === "" && setFormData({ ...formData, bookingId: id });
    console.log("id: ", id);
  }, [id, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    CustomerService.rejectCleaning(formData);
    updateBookings(true);
    setFormData(initialState);

    console.log("Formdata: ", formData);
  };

  return (
    <div className="complaint-container">
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            What went wrong?
          </label>
          <textarea
            value={formData.feedback}
            onChange={(e) =>
              setFormData({ ...formData, feedback: e.target.value })
            }
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-sm" type="submit">
            Submit feedback
          </button>
        </div>
      </form>
    </div>
  );
}
