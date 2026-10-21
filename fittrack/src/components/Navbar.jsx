
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/" },
        { label: "Workouts", path: "/workouts" },
        { label: "Exercises", path: "/exercises" },
        { label: "Progress", path: "/progress" },
        { label: "History", path: "/history" },
        { label: "Profile", path: "/profile" },
    ];

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="navbar-logo">F</span>
                <span className="navbar-brand-text">
                    Fit<span>Track</span>
                    <small>TRAIN WITH PURPOSE</small>
                </span>
            </Link>

            <div className="nav-links">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${isActive ? "active" : ""}`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default Navbar;