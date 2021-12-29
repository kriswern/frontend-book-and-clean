export default function BookingsFilterList({ setFilter, changeFilter }) {
  return (
    <div className="filter-buttons-box">
      <button onClick={() => setFilter("name")}>Name</button>
      <button onClick={() => setFilter("status")}>Status</button>
      <button onClick={() => setFilter("adress")}>Address</button>
      <button onClick={() => setFilter("closest")}>Closest</button>
    </div>
  );
}
