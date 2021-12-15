import "../../css/booking.css";
import CleanerService from "../../services/CleanerService";


export default function CleanerBooking(props) {
  console.log("item:" + props.item);

  const handleStatusChange = (e) => {
    console.log(e.target.value)
    CleanerService.changeStatusToDone(e.target.value)
    .then(response => {
      if(response.status === 200){
        props.updateBookings(true) 
      }
    })
    .catch(error => {
      console.log(error.response.data.error)
    })
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
      <div>
      {props.item.status === "Confirmed" &&
      <button className="btn btn-primary" value={props.item.id} onClick={handleStatusChange}>
        Done</button>}
      </div>
      {props.item.staus === "pending" && (
        <button className="btn btn-primary">Accept booking</button>
      )}
    </div>
  );
}
