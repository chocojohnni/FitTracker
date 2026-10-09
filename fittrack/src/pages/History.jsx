
import { useState } from "react";
import { useWorkout } from "../WorkoutContext.jsx";

function History() {
    const { workoutHistory, setWorkoutHistory } = useWorkout();

    const [expandedWorkout, setExpandedWorkout] = useState(null);

    function toggleWorkout(workoutId) {
        if (expandedWorkout === workoutId) {
            setExpandedWorkout(null);
        } else {
            setExpandedWorkout(workoutId);
        }
    }

    function deleteWorkout(workoutId) {
        const updatedHistory = workoutHistory.filter(
            (workout) => workout.id !== workoutId
        );

        setWorkoutHistory(updatedHistory);

        if (expandedWorkout === workoutId) {
            setExpandedWorkout(null);
        }
    }

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
                        <button
                            className="history-workout-header"
                            onClick={() => toggleWorkout(workout.id)}
                        >
                            <div>
                                <h3>{workout.name}</h3>
                                <p>{workout.date}</p>
                                <p>
                                    {workout.exercises.length} exercises
                                </p>
                            </div>

                            <span>
                                {expandedWorkout === workout.id
                                    ? "▲"
                                    : "▼"}
                            </span>
                        </button>

                        {expandedWorkout === workout.id && (
                            <div className="history-workout-details">
                                {workout.exercises.map((exercise) => (
                                    <div
                                        className="history-exercise"
                                        key={exercise.id}
                                    >
                                        <h4>{exercise.name}</h4>

                                        <div className="history-sets">
                                            <div className="history-set-header">
                                                <span>Set</span>
                                                <span>Weight</span>
                                                <span>Reps</span>
                                            </div>

                                            {exercise.sets.map((set, index) => (
                                                <div
                                                    className="history-set-row"
                                                    key={index}
                                                >
                                                    <span>{index + 1}</span>
                                                    <span>{set.weight}</span>
                                                    <span>{set.reps}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    className="delete-workout-button"
                                    onClick={() => deleteWorkout(workout.id)}
                                >
                                    Delete Workout
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default History;