export default function CustomerNameList({allCustomers,changeActiveCustomer,searchInput}){
    return(
        <div className="nameListWindow">
            {allCustomers
              .filter((customer) => customer.name.includes(searchInput))
              .map((customer) => {
                return (
                  <button onClick={() => changeActiveCustomer(customer)}>
                    {customer.name}
                  </button>
                );
              })}
          </div>
    )
}