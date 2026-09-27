import { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";

function Workouts() {
    const [exercises, setExercises] = useState([
        "Bench Press",
        "Incline Dumbbell Press",
        "Shoulder Press"
    ]);

    function addExercise() {
        setExercises([
            ...exercises,
            "New Exercise"
        ]);
    }

    function deleteExercise(index) {
        const updatedExercises = exercises.filter(
            (_, exerciseIndex) => exerciseIndex !== index
        );

        setExercises(updatedExercises);
    }

    return (
        <main className="workout-page">
            <section className="workout-header">
                <h2>Push Day</h2>
                <p>Chest • Shoulders • Triceps</p>
            </section>

            <section className="exercises">
                {exercises.map((exercise, index) => (
                    <ExerciseCard
                        key={index}
                        name={exercise}
                        onDelete={() => deleteExercise(index)}
                    />
                ))}
            </section>

            <button className="add-exercise-button" onClick={addExercise}>
                + Add Exercise
            </button>

            <button className="finish-workout-button">
                Finish Workout
            </button>
        </main>
    );
}

export default Workouts;