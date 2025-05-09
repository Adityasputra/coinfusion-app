import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <NavLink to="/coin-market">Coin Market</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
