export default function Header({ currentHeader }) {
  return (
    <header className="masthead p-2">
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12 text-center">
            <h1 className="fw-light">
              {currentHeader ? currentHeader : "BOOK"}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
