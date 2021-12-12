import { useEffect, useState } from "react";
import "../../css/booking.css";
import Adminservice from "../../services/Adminservice";
import CustomerService from "../../services/CustomerService";
import CleanerService from "../../services/CleanerService";
import TokenService from "../../services/TokenService";
import AdminBooking from "./AdminBooking";
import CleanerBooking from "./CleanerBooking";
import CustomerBooking from "./CustomerBooking";

export default function Bookings() {
  const [bookings, setBookings] = useState();
  const [role, setRole] = useState();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("in booking state");
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setRole(role);
    }
  }, []);


  useEffect(() => {
    const getBookings = () => {
      switch (role) {
        case "admin":
          console.log("in admin bookings");
          Adminservice.getAllBookings().then((response) => {
            setBookings(response.data);
          });
          break;
        case "customer":
          console.log("in costumer bookings");
          CustomerService.getMyBookings()
            .then((response) => {
              console.log(response);
              setBookings(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              if (error.toJSON().status > 400) {
                console.log(
                  "Access denied, error code: ",
                  error.toJSON().status
                );
                //We need to delete token and force a refresh
              }
            });
          break;
        case "cleaner":
          console.log("im here");
          CleanerService.getMyBookings().then((response) => {
            setBookings(response.data);
          });
          break;

        default:
          break;
      }
      setUpdate(false);
    };
    getBookings();
  }, [role]);

  const deleteBooking = (id) => {
    console.log(id);
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  useEffect(() => {
    update && setTimeout(() => {
      switch (role) {
        case "admin":
          Adminservice.getAllBookings().then((response) => {
            setBookings(response.data);
            console.log(response.data);
          });
          break;
          case "cleaner":
            CleanerService.getMyBookings().then((response) => {
              setBookings(response.data)
            })
          break;
          case "customer":
            CustomerService.getMyBookings().then((response) => {
              setBookings(response.data)
            })
            break;
        default:
          break;
      }
    }, 300);
    setUpdate(false);
  }, [update, role]);

  const updateBookings = (bool) => {
    setUpdate(bool);
  };

  return (
    <div className="p-2">
      <h4 className="newbooking-header">Bookings</h4>

      <div className="bookings-container p-2">
        {bookings &&
          role &&
          bookings.map((booking, index) => {
            switch (role) {
              case "admin":
                return <AdminBooking
                  key={index}
                  item={booking}
                  deleteBooking={deleteBooking}
                  updateBookings={updateBookings}
                  role={role}
                />;
              case "customer":
               return <CustomerBooking
                  key={index}
                  item={booking}
                  deleteBooking={deleteBooking}
                  updateBookings={updateBookings}
                  role={role}
                />;
              case "cleaner":
               return <CleanerBooking
                  key={index}
                  item={booking}
                  deleteBooking={deleteBooking}
                  updateBookings={updateBookings}
                  role={role}
                />;
              default:
                return <div>Error...</div>
            }
          })}
      </div>
    </div>
  );
}
