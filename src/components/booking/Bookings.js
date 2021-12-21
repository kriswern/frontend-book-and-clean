import { useEffect, useState } from "react";
import "../../css/booking.css";
import TokenService from "../../services/TokenService";
import AdminBooking from "./AdminBooking";
import CleanerBooking from "./CleanerBooking";
import CustomerBooking from "./CustomerBooking";
import useGetBookings from "../hooks/useGetBookings";
import NothingHere from "../error/NothingHere";
import BookingsFilterList from "./BookingsFilterList";
import _ from "lodash";

export default function Bookings(props) {
  const [bookings, setBookings] = useState();
  const [role, setRole] = useState();
  const [update, setUpdate] = useState(false);
  const { response, loading, error, getBookings } = useGetBookings();
  const [filter, setFilter] = useState("closest");

  useEffect(() => {
    const role = TokenService.getRoleFromToken();
    if (role !== undefined) {
      setRole(role);
    }
  }, []);

  useEffect(() => {
    getBookings(role);
  }, [role]);

  useEffect(() => {
    if(error){
      setBookings()
      props.logout(true)
    }
  }, [error, props])

  useEffect(() => {
    if (response && response.length > 0) {
      response &&
        setBookings(() => {
          checkFilter(response);
        });
    }
  }, [response, filter]);

  useEffect(() => {
    if (update) {
      const timeOut = setTimeout(() => {
        getBookings(role);
        console.log("getBookings update");
      }, 100);
      return () => {
        setUpdate(false);
        clearTimeout(timeOut);
      };
    }
  }, [update, role, getBookings]);

  const updateBookings = (bool) => {
    setUpdate(bool);
  };

  const checkFilter = (response) => {
    let arr;

    switch (filter) {
      case "name": {
        arr = _.sortBy(
          response,
          [(booking) => _.get(booking, "description").toLowerCase(), "id"],
          ["asc", "asc"]
        );
        break;
      }
      case "status": {
        arr = _.sortBy(
          response,
          [(booking) => _.get(booking, "status").toLowerCase(), "id"],
          ["asc", "asc"]
        );
        break;
      }

      case "adress": {
        arr = _.sortBy(
          response,
          [(booking) => _.get(booking, "address").toLowerCase(), "id"],
          ["asc", "asc"]
        );
        break;
      }

      case "closest": {
        arr = response.sort((a, b) => {
          const aStringToDate = new Date(a.date);
          const bStringToDate = new Date(b.date);

          return aStringToDate - bStringToDate;
        });

        break;
      }

      default: {
        arr = response;
      }
    }
    setBookings(arr);
  };

  return (
    <div className="p-2">
      <div className="bookings-filter-window">
        {bookings && (
          <BookingsFilterList
            changeFilter={checkFilter}
            setFilter={setFilter}
          />
        )}
      </div>
      <h4 className="newbooking-header">
        {role && role.charAt(0).toUpperCase() + role.slice(1)} Bookings
      </h4>

      <div className="bookings-container p-2">
        {!bookings && role && !loading && <NothingHere />}
        {bookings &&
          !loading &&
          role &&
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
