import { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import Bill from "./Bill";
import '../../css/bill.css'

export default function MyBills(props) {
  const [bills, setBills] = useState([]);
  const [update, setUpdate] = useState(false);
  let customerBills = [];

  const payBill = () => {
    update ? setUpdate(false) : setUpdate(true)
  } 

  if (bills.length > 0) {
    customerBills = bills.map((item, index) => (
      <Bill key={index} item={item} payBill={payBill}/>
    ));
  }

  useEffect(() => {
    const myBills = CustomerService.getMyBills()
      .then((response) => {
        if (response.status === 200) {
          setBills(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        props.logout(true)
      });

    setBills(myBills);
  }, [update]);

  return (
    <div className="bills-container">
      {customerBills.length > 0 ? (<><div><h3>Your bills:</h3></div><ul className="bills-list">{customerBills}</ul></>
        
      ) : (
        <div>
          <h1>You have no bills to pay</h1>
        </div>
      )}
    </div>
  );
}
