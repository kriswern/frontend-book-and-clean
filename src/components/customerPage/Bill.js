import CustomerService from "../../services/CustomerService";

export default function Bill({ item, payBill }) {
  
  const payForBill = () => {
    const bookingIds = item.bookings.map((booking) => booking.id);

    CustomerService.payForBill(item.id, bookingIds)
      .then((response) => {
        alert("Thank you!")
        payBill(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  return (
    <li className="bill-container">
      <div>
        <ul className="bill-list">
          {item.bookings.length > 0 &&
            item.bookings.map((booking, index) => (
              <li className="bill-info-container" key={index}>
                <div className="bill-info">
                  <span>{booking.date}</span>
                  <span>{booking.priceList.type}</span>
                  <span>{booking.priceList.price}:-</span>
                </div>
              </li>
            ))}
        </ul>
        <div className="bill-total">Total: {item.total}:-</div>
      </div>
      <div className="d-grid gap-2 bill-btn-container">
        <button className="btn btn-success btn-sm" onClick={payForBill}>
          Pay bill
        </button>
      </div>
    </li>
  );
}
