import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1>FitTrack</h1>

            <div>
                <Link to="/">Dashboard</Link>
                <Link to="/workouts">Workouts</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/progress">Progress</Link>
                <Link to="/history">History</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    );
}

export default Navbar;