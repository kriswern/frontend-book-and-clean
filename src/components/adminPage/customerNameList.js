export default function CustomerNameList({
  allCustomers,
  changeActiveCustomer,
  searchInput,
}) {
  return (
    <div className="nameListWindow">
      {searchInput
        ? allCustomers
            .filter((customer) => {
              const customerNameUpper = customer.name.toUpperCase();
              const searchInputUpper = searchInput.toUpperCase();
              return customerNameUpper.includes(searchInputUpper);
            })

            .map((customer, index) => {
              return (
                <button
                  key={index}
                  onClick={() => changeActiveCustomer(customer)}
                >
                  {customer.name}
                </button>
              );
            })
        : allCustomers.map((customer, index) => {
            return (
              <button
                key={index}
                onClick={() => changeActiveCustomer(customer)}
              >
                {customer.name}
              </button>
            );
          })}
    </div>
  );
}
