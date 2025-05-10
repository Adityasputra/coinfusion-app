import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <NavLink to="/market">Coin Market</NavLink>
        <NavLink to="/converter" style={{ marginLeft: "1rem" }}>
          Currency Converter
        </NavLink>
        <NavLink to="/watchlist" style={{ marginLeft: "1rem" }}>
          Watchlist
        </NavLink>
        <NavLink to="/portfolio" style={{ marginLeft: "1rem" }}>
          Portfolio
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
