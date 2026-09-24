import StatCard from "../components/StatCard";

function Dashboard() {
    return (
        <main className="dashboard">
            <seciton className="dashboard-header">
                <h2>Good morning!</h2>
                <p>Ready for today's workout?</p>
            </seciton>

            <section className="stats">
                <StatCard
                    title="Workouts"
                    value="12"
                    description="This month"
                />

                <StatCard
                    title="Volume"
                    value="24,850 lb"
                    description="This month"
                />

                <StatCard
                    title="Streak"
                    value="5"
                    description="Days"
                />
            </section>

            <section className="today-workout">
                <h2>Today's Workout</h2>

                <div className="workout-card">
                    <h3>Push Day</h3>
                    <p>Chest • Shoulders • Triceps</p>

                    <div>
                        <span>6 Exercises</span>
                        <button>Start Workout</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;