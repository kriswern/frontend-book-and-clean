import { useEffect, useState } from "react";
import "../../css/booking.css";
import TokenService from "../../services/TokenService";
import AdminBooking from "./AdminBooking";
import CleanerBooking from "./CleanerBooking";
import CustomerBooking from "./CustomerBooking";
import useGetBookings from "../hooks/useGetBookings";
import NothingHere from "../error/NothingHere"

export default function Bookings() {
  const [bookings, setBookings] = useState();
  const [role, setRole] = useState();
  const [update, setUpdate] = useState(false);
  const { response, loading, getBookings } = useGetBookings();

  useEffect(() => {
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setRole(role);
    }
  }, []);

  useEffect(() => {
    getBookings(role);
    console.log("getBookings")
  }, [role]);

  useEffect(() => {
    if(response && response.length > 0){
      response && setBookings(response)
    }
  }, [response]);

  useEffect(() => {
    if (update) {
      const timeOut = setTimeout(() => {
        getBookings(role);
        console.log("getBookings update")

      },100);
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
      <h4 className="newbooking-header">{role && role.charAt(0).toUpperCase() + role.slice(1)} Bookings</h4>

      <div className="bookings-container p-2">
        {!bookings && <NothingHere />}
        {bookings && !loading &&
          bookings.map((booking, index) => {
            switch (role) {
              case "admin":
                return (
                  <AdminBooking
                    key={index}
                    item={booking}
                    updateBookings={updateBookings}
                    role={role}
                  />
                );
              case "customer":
                return (
                  <CustomerBooking
                    key={index}
                    item={booking}
                    updateBookings={updateBookings}
                    role={role}

                  />
                );
              case "cleaner":
                return (
                  <CleanerBooking
                    key={index}
                    item={booking}
                    updateBookings={updateBookings}
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
