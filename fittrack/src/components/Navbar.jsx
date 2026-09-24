function Navbar() {
    return (
        <nav>
            <h1>FitTrack</h1>

            <div>
                <a href="/">Dashboard</a>
                <a href="/workouts">Workouts</a>
                <a href="/exercises">Exercises</a>
                <a href="/progress">Progress</a>
            </div>
        </nav>
    );
}

export default Navbar;