import { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exerciseLibrary from "../data/exercises";
import { useWorkout } from "../WorkoutContext.jsx";

function Workouts() {
    const { workoutHistory, setWorkoutHistory } = useWorkout();

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
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("All");
    const [workoutCompleted, setWorkoutCompleted] = useState(false);

    function addExercise() {
        setShowExerciseLibrary(true);
    }

    function selectExercise(exerciseName) {
        const newExercise = {
            id: Date.now(),
            name: exerciseName,
            sets: [
                { weight: "", reps: "" }
            ]
        };

        setExercises([
            ...exercises,
            newExercise
        ]);
        
        setSearchTerm("");
        setShowExerciseLibrary(false);
        setSelectedMuscleGroup("All");
    }

    function deleteExercise(id) {
        const updatedExercises = exercises.filter(
            (exercise) => exercise.id !== id
        );

        setExercises(updatedExercises);
    }

    function addSet(exerciseId) {
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
                return {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        { weight: "", reps: "" }
                    ]
                };
            }

            return exercise;
        });

        setExercises(updatedExercises);
    }

    function updateSet(exerciseId, setIndex, field, value) {
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
                const updatedSets = exercise.sets.map((set, index) => {
                    if (index === setIndex) {
                        return {
                            ...set,
                            [field]: value
                        };
                    }

                    return set;
                });

                return {
                    ...exercise,
                    sets: updatedSets
                };
            }

            return exercise;
        });

        setExercises(updatedExercises);
    }

    function deleteSet(exerciseId, setIndex) {
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
                const updatedSets = exercise.sets.filter(
                    (set, index) => index !== setIndex
                );

                return {
                    ...exercise,
                    sets: updatedSets
                };
            }

            return exercise;
        });

        setExercises(updatedExercises);
    }

    function finishWorkout() {
        const completedWorkout = {
            id: Date.now(),
            name: "Push Day",
            date: new Date().toLocaleDateString(),
            exercises: exercises
        };

        setWorkoutHistory([
            ...workoutHistory,
            completedWorkout
        ]);

        setWorkoutCompleted(true);
    }

    const filteredExercises = exerciseLibrary.filter((exercise) => {
        const matchesSearch = exercise.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        
        const matchesMuscleGroup =
            selectedMuscleGroup === "All" ||
            exercise.muscleGroup === selectedMuscleGroup;

        return matchesSearch && matchesMuscleGroup;
    });

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
                        id={exercise.id}
                        name={exercise.name}
                        sets={exercise.sets}
                        onDelete={() => deleteExercise(exercise.id)}
                        onAddSet={() => addSet(exercise.id)}
                        onUpdateSet={updateSet}
                        onDeleteSet={deleteSet}
                    />
                ))}
            </section>

            <button className="add-exercise-button" onClick={addExercise}>
                + Add Exercise
            </button>

            <button className="finish-workout-button" onClick={finishWorkout}>
                Finish Workout
            </button>

            {workoutCompleted && (
                <p className="workout-completed-message">
                    Workout completed!
                </p>
            )}

            {showExerciseLibrary && (
                <section className="exercise-library">
                    <h2>Add Exercise</h2>

                    <input
                        type="text"
                        placeholder="Search exercises..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}    
                    />

                    <div className="muscle-filters">
                        <button
                            onClick={() => setSelectedMuscleGroup("All")}
                        >
                            All
                        </button>

                        <button
                            onClick={() => setSelectedMuscleGroup("Chest")}
                        >
                            Chest
                        </button>

                        <button
                            onClick={() => setSelectedMuscleGroup("Shoulders")}
                        >
                            Shoulders
                        </button>

                        <button
                            onClick={() => setSelectedMuscleGroup("Back")}
                        >
                            Back
                        </button>
                    </div>

                    {filteredExercises.map((exercise) => (
                        <button
                            key={exercise.id}
                            onClick={() => selectExercise(exercise.name)}
                        >
                            {exercise.name}
                        </button>
                    ))}

                    <button onClick={() => {
                        setShowExerciseLibrary(false);
                        setSearchTerm("");
                        setSelectedMuscleGroup("All");
                        }}
                    >
                        Close
                    </button>
                </section>
            )}
        </main>
    );
}

export default Workouts;