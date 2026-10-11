import { useWorkout } from "../WorkoutContext.jsx"

function Progress() {
    const { workoutHistory } = useWorkout();

    let totalExercises = 0;
    let totalSets = 0;
    let totalVolume = 0;

    const personalRecords = {};

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

                if (
                    set.weight !== "" && Number.isFinite(weight) && weight > 0
                ) {
                    if (
                        !personalRecords[exercise.name] ||
                        weight > personalRecords[exercise.name]
                    ) {
                        personalRecords[exercise.name] = weight;
                    }
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
                    <p className="stat-card-title">Total Workouts</p>
                    <h3>{workoutHistory.length}</h3>
                    <p className="stat-card-description">
                        Completed Workouts
                    </p>
                </div>

                <div className="stat-card">
                    <p className="stat-card-title">Total Exercises</p>
                    <h3>{totalExercises}</h3>
                    <p className="stat-card-description">
                        Exercises logged
                    </p>
                </div>

                <div className="stat-card">
                    <p className="stat-card-title">Total Sets</p>
                    <h3>{totalSets}</h3>
                    <p className="stat-card-description">
                        Sets recorded
                    </p>
                </div>

                <div className="stat-card">
                    <p className="stat-card-title">Training Volume</p>
                    <h3>{totalVolume.toLocaleString()} lbs</h3>
                    <p className="stat-card-description">
                        Total weight x reps
                    </p>
                </div>
            </section>

            <section className="personal-records">
                <h2>Personal Records</h2>
                <p>Heaviest weight recorded for each exercise.</p>

                {Object.keys(personalRecords).length === 0 ? (
                    <p>
                        No personal records yet. Complete a workout 
                        with valid weight entries to get started
                    </p>
                ) : (
                    Object.entries(personalRecords)
                        .sort((a, b) => b[1] - a[1])
                        .map(([exerciseName, weight]) => (
                            <div className="workout-card pr-card" key={exerciseName}>
                                <div>
                                    <h3>{exerciseName}</h3>
                                    <p>Heaviest weight</p>
                                </div>

                                <strong>{weight.toLocaleString()} lbs</strong>
                            </div>
                        ))
                )}
            </section>
        </main>
    );
}

export default Progress;