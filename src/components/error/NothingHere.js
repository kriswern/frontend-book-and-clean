import "../../css/booking.css";

export default function NothingHere() {
  return (
    <div className="booking-container">
      <h5 className="booking-header">There's nothing here :(</h5>
      <p>You don't appear to have any bookings..</p>
      <p>As soon as you book a cleaning you will see it here!</p>
      <br />
      <i>
        If you have bookings that does not show up, you should contact the
        admin.
      </i>
    </div>
  );
}
