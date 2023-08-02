export default function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navigation">
        <a className="navbar-brand navigation__header">Foodie Fleet</a>
        <ul className="navbar-nav">
          <li className="nav-item dropdown navigation__item--address">
            Address
          </li>
        </ul>
      </nav>
    </>
  );
}
