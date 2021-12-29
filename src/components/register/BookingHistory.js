import { useState, useEffect } from "react";
import "../../css/userProfile.css";
import useGetBookings from "../hooks/useGetBookings";
import TokenService from "../../services/TokenService";

export default function BookingHistory() {
    const [bookings, setBookings] = useState();
    const [role, setRole] = useState();
    const { response, getBookings } = useGetBookings();

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
        if (response && response.length > 0) {
            setBookings(response);
        }
    }, [response]);

    return (
        <div className="text-center">
            <h3>Booking History</h3>
            {bookings &&
                role &&
                bookings.map((booking, index) => {
                    if (
                        booking.status === "Rejected" ||
                        booking.status === "Payed"
                    ) {
                        return (
                            <div className="card bg-dark text-white p-3 w-25 container" key={index}>
                                <h5 className="container">
                                    <span>{booking.priceList.type}</span>
                                    <span className="booking-price">
                                        {booking.priceList.price}:-
                                    </span>
                                </h5>

                                <p>
                                    <b>Address:</b> {booking.address}
                                </p>
                                <p>
                                    <b>Date:</b> {booking.date}
                                </p>
                                <p>
                                    <b>Time:</b> {booking.time}
                                </p>
                                <p>
                                    <b>Status:</b> {booking.status}
                                </p>
                            </div>
                        );
                    }
                })}
        </div>
    );
}
