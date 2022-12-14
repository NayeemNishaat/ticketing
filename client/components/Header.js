import Link from "next/link";

function Header({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Post Ticket", href: "/ticket/new" },
    currentUser && { label: "Orders", href: "/order" },
    currentUser && { label: "Sign Out", href: "/auth/signout" }
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li className="nav-item" key={href}>
          <Link href={href}>
            <a className="nav-link"> {label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light px-5">
      <Link href="/">
        <a className="navbar-brand">LabyTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}

export default Header;
