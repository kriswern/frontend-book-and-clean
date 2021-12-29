import { useState, useEffect } from "react";
import CleanerService from "../../services/CleanerService";
import Adminservice from "../../services/Adminservice";
import CustomerService from "../../services/CustomerService";

const useGetBookings = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getBookings = (role) => {
    switch (role) {
      case "admin":
        Adminservice.getAllBookings()
          .then((response) => {
            setResponse(response.data);
          })
          .catch((error) => {
            if (error.toJSON().status > 400) {
              console.log("Access denied, error code: ", error.toJSON().status);
              setError(true);
            }
          })
          .finally(() => {
            setLoading(false);
          });
        break;
      case "customer":
        CustomerService.getMyBookings()
          .then((response) => {
            setResponse(response.data);
          })
          .catch((error) => {
            if (error.toJSON().status > 400) {
              console.log("Access denied, error code: ", error.toJSON().status);
              setError(true);
            }
          })
          .finally(() => {
            setLoading(false);
          });
        break;
      case "cleaner":
        CleanerService.getMyBookings()
          .then((response) => {
            setResponse(response.data);
          })
          .catch((error) => {
            if (error.toJSON().status > 400) {
              console.log("Access denied, error code: ", error.toJSON().status);
              setError(true);
            }
          })
          .finally(() => {
            setLoading(false);
          });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return { response, getBookings, loading, error };
};

export default useGetBookings;
