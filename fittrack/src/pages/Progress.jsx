import { useWorkout } from "../WorkoutContext.jsx"

function Progress() {
    const { workoutHistory } = useWorkout();

    let totalExercises = 0;
    let totalSets = 0;
    let totalVolume = 0;

    workoutHistory.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
            totalExercises++;

            exercise.sets.forEach((set) => {
                const weight = Number(set.weight);
                const reps = Number(set.reps);

                totalSets++;

                if (
                    set.weight !== "" && set.reps !== "" &&
                    Number.isFinite(weight) && Number.isFinite(reps) &&
                    weight >= 0 && reps >= 0
                ) {
                    totalVolume += weight * reps;
                }
            });
        });
    });

    return (
        <main className="dashboard">
            <section className="dashboard-header">
                <h2>Your Progress</h2>
                <p>Track your training achievemenets.</p>
            </section>

            <section className="stats">
                <div className="stat-card">
                    <p className="stat-card-title">
                        Total Workouts
                    </p>
                    <h3>{workoutHistory.length}</h3>
                    <p className="stat-card-description">
                        Completed Workouts
                    </p>
                </div>

                <div className="stat-card">
                    <p className="stat-card-title">
                        Total Exercises
                    </p>
                    <h3>{totalExercises}</h3>
                    <p className="stat-card-description">
                        Exercises logged
                    </p>
                </div>

                <div className="stat-card">
                    <p className="stat-card-title">
                        Total Sets
                    </p>
                    <h3>{totalSets}</h3>
                    <p className="stat-card-description">
                        Sets recorded
                    </p>
                </div>

                <div className="stat-card">
                    <p className="stat-card-title">
                        Training Volume
                    </p>
                    <h3>
                        {totalVolume.toLocaleString()} lbs
                    </h3>
                    <p className="stat-card-description">
                        Total weight x reps
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Progress;