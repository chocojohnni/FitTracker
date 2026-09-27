import { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exerciseLibrary from "../data/exercises"

function Workouts() {
    const [exercises, setExercises] = useState([
        "Bench Press",
        "Incline Dumbbell Press",
        "Shoulder Press"
    ]);
    
    const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

    function addExercise() {
        setShowExerciseLibrary(true);
    }

    function selectExercise(exerciseName) {
        setExercises([
            ...exercises,
            exerciseName
        ]);

        setShowExerciseLibrary(false);
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

            {showExerciseLibrary && (
                <section className="exercise-library">
                    <h2>Add Exercise</h2>

                    {exerciseLibrary.map((exercise) => (
                        <button
                            key={exercise.id}
                            onClick={() => selectExercise(exercise.name)}
                        >
                            {exercise.name}
                        </button>
                    ))}

                    <button onClick={() => setShowExerciseLibrary(false)}>
                        Close
                    </button>
                </section>
            )}
        </main>
    );
}

export default Workouts;