import Link from "next/link";

function Header({ currentUser }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {currentUser ? "Sign Out" : "Sign IN/Up"}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
