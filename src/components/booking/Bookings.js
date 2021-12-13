import { useEffect, useState } from "react";
import "../../css/booking.css";
import TokenService from "../../services/TokenService";
import AdminBooking from "./AdminBooking";
import CleanerBooking from "./CleanerBooking";
import CustomerBooking from "./CustomerBooking";
import useGetBookings from "../hooks/useGetBookings";

export default function Bookings() {
  const [bookings, setBookings] = useState();
  const [role, setRole] = useState();
  const [update, setUpdate] = useState(false);
  const { response, loading, getBookings } = useGetBookings();
  

  useEffect(() => {
    console.log("in booking state");
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setRole(role);
    }
  }, []);

  useEffect(() => {
    role && getBookings(role);
    console.log(role)
  }, [role]);

  useEffect(() => {
    setBookings(response);
    console.log(response);
  }, [response]);

  const deleteBooking = (id) => {
    console.log(id);
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  useEffect(() => {
    if (update) {
      const timeOut = setTimeout(() => {
        getBookings(role);
      }, 200);
      return () => {
        setUpdate(false);
        clearTimeout(timeOut);
      };
    }
    
  }, [update, role, getBookings]);

  const updateBookings = (bool) => {
    setUpdate(bool);
  };

  return (
    <div className="p-2">
      <h4 className="newbooking-header">Bookings</h4>

      <div className="bookings-container p-2">
        {bookings &&
          role &&
          !loading &&
          bookings.map((booking, index) => {
            switch (role) {
              case "admin":
                return (
                  <AdminBooking
                    key={index}
                    item={booking}
                    deleteBooking={deleteBooking}
                    updateBookings={updateBookings}
                    role={role}
                  />
                );
              case "customer":
                return (
                  <CustomerBooking
                    key={index}
                    item={booking}
                    deleteBooking={deleteBooking}
                    updateBookings={updateBookings}
                    role={role}
                  />
                );
              case "cleaner":
                return (
                  <CleanerBooking
                    key={index}
                    item={booking}
                    deleteBooking={deleteBooking}
                    updateBookings={updateBookings}
                    role={role}
                  />
                );
              default:
                return <div>Error...</div>;
            }
          })}
      </div>
    </div>
  );
}
