import { useWorkout } from "../WorkoutContext.jsx";

function History() {
    const { workoutHistory } = useWorkout();
    
    return (
        <div className="workout-page">
            <div className="workout-header">
                <h2>Workout History</h2>
                <p>View your completed workouts.</p>
            </div>

            {workoutHistory.length === 0 ? (
                <p>No completed workouts yet.</p>
            ) : (
                workoutHistory.map((workout) => (
                    <div className="workout-card" key={workout.id}>
                        <h3>{workout.name}</h3>

                        <p>{workout.date}</p>

                        <p>
                            Exercises: {workout.exercises.length}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default History;