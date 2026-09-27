import { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exerciseLibrary from "../data/exercises"

function Workouts() {
    const [exercises, setExercises] = useState([
        {
            id: 1,
            name: "Bench Press",
            sets: [
                { weight: 185, reps: 8 },
                { weight: 185, reps: 8 },
                { weight: 185, reps: 7 }
            ]
        },
        {
            id: 2,
            name: "Incline Dumbbell Press",
            sets: [
                { weight: 50, reps: 10 },
                { weight: 50, reps: 9 },
                { weight: 50, reps: 8 }
            ]
        },
        {
            id: 3,
            name: "Shoulder Press",
            sets: [
                { weight: 40, reps: 10 },
                { weight: 40, reps: 9 },
                { weight: 40, reps: 8 }
            ]
        }
    ]);
    
    const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

    function addExercise() {
        setShowExerciseLibrary(true);
    }

    function selectExercise(exerciseName) {
        const newExercise = {
            id: Date.now(),
            name: exerciseName,
            sets: [
                { weight: 0, reps: 0 }
            ]
        };

        setExercises([
            ...exercises,
            exerciseName
        ]);

        setShowExerciseLibrary(false);
    }

    function deleteExercise(id) {
        const updatedExercises = exercises.filter(
            (exercise) => exercise.id !== id
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
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        name={exercise.name}
                        sets={exercise.sets}
                        onDelete={() => deleteExercise(exercise.id)}
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