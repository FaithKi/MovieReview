import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="text-4xl font-bold">MovieReviewZZZ</div>
      </Link>
    </div>
  );
}
