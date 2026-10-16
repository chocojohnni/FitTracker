import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import exerciseLibrary from "../data/exercises";
import { useWorkout } from "../WorkoutContext.jsx";

function Workouts() {
    const { workoutHistory, setWorkoutHistory,
        savedWorkouts, setSavedWorkouts } = useWorkout();

    const [exercises, setExercises] = useState([]);
    const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("All");
    const [workoutCompleted, setWorkoutCompleted] = useState(false);
    const [workoutName, setWorkoutName] = useState("Push Day");
    const [newRoutineName, setNewRoutineName] = useState("");
    const [selectedRoutineId, setSelectedRoutineId] = useState(null);
    const [workoutStartTime, setWorkoutStartTime] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    function addExercise() {
        setShowExerciseLibrary(true);
    }

    function selectExercise(exerciseName) {
        const newExercise = {
            id: Date.now(),
            name: exerciseName,
            sets: [{ weight: "", reps: "" }]
        };

        if (selectedRoutineId !== null) {
            const updatedRoutines = savedWorkouts.map((routine) => {
                if (routine.id === selectedRoutineId) {
                    return {
                        ...routine,
                        exercises: [...routine.exercises, newExercise]
                    };
                }

                return routine;
            });

            setSavedWorkouts(updatedRoutines);
        } else {
            setExercises([...exercises, newExercise]);
        }

        setSelectedRoutineId(null);
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
            name: workoutName.trim() || "Untitled Workout",
            date: new Date().toLocaleDateString(),
            exercises: exercises
        };

        setWorkoutHistory([
            ...workoutHistory,
            completedWorkout
        ]);

        setWorkoutCompleted(true);
    }

    function saveRoutine() {
        const trimmedName = newRoutineName.trim();

        if (!trimmedName) {
            return;
        }

        const newRoutine = {
            id: Date.now(),
            name: trimmedName,
            exercises: []
        };

        setSavedWorkouts([...savedWorkouts, newRoutine]);
        setNewRoutineName("");
    }

    function deleteRoutine(routineId) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this routine?'
        );

        if (!confirmed) {
            return;
        }

        const updatedRoutines = savedWorkouts.filter(
            (savedRoutine) => savedRoutine.id !== routineId
        );

        setSavedWorkouts(updatedRoutines);
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

    useEffect(() => {
        if (workoutStartTime === null) {
            return;
        }

        function updateTimer() {
            const elapsed = Math.floor(
                (Date.now() - workoutStartTime) / 1000
            );

            setElapsedSeconds(elapsed);
        }

        updateTimer();

        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [workoutStartTime]);

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds & 3600) / 660);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map((unit) => String(unit).padStart(2, "0"))
            .join(":");
    }

    return (
        <main className="workout-page">
            <section className="saved-routines">
                <h2>My Workout Routines</h2>
                <p>Create routines you can reuse for future workouts.</p>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        saveRoutine();
                    }}
                    className="routine-form"
                >
                    <input type="text" value={newRoutineName} onChange={(event) => setNewRoutineName(event.target.value)}
                        placeholder="e.g. Push Day" aria-label="New routine name" />

                    <button type="submit">Create Routine</button>
                </form>

                {savedWorkouts.length === 0 ? (
                    <p>You haven't created any routines yet.</p>
                ) : (
                    <div className="routine-list">
                        {savedWorkouts.map((routine) => (
                            <div className="workout-card" key={routine.id}>
                                <h3>{routine.name}</h3>

                                <p>{routine.exercises.length} exercises</p>

                                {routine.exercises.length > 0 ? (
                                    <ul className="routine-exercise-list">
                                        {routine.exercises.map((exercise) => (
                                            <li key={exercise.id}>
                                                <span>{exercise.name}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedRoutines = savedWorkouts.map((savedRoutine) => {
                                                            if (savedRoutine.id === routine.id) {
                                                                return {
                                                                    ...savedRoutine,
                                                                    exercises: savedRoutine.exercises.filter(
                                                                        (savedExercise) => savedExercise.id !== exercise.id
                                                                    )
                                                                };
                                                            }

                                                            return savedRoutine;
                                                        });

                                                        setSavedWorkouts(updatedRoutines);
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No exercises added yet.</p>
                                )}

                                <div className="routine-actions">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (routine.exercises.length === 0) {
                                                alert("Add at least one exercise to this routine first.");
                                                return;
                                            }

                                            const confirmed = window.confirm(
                                                "Starting this routine will replace your current workout. Continue?"
                                            );

                                            if (!confirmed) {
                                                return;
                                            }

                                            setExercises(
                                                routine.exercises.map((exercise) => ({
                                                    ...exercise,
                                                    id: Date.now() + Math.random(),
                                                    sets: [{ weight: "", reps: "" }]
                                                }))
                                            );

                                            setWorkoutName(routine.name);
                                            setWorkoutCompleted(false);
                                            setSelectedRoutineId(null);
                                            setShowExerciseLibrary(false);
                                        }}
                                    >
                                        Start Workout
                                    </button>

                                    <button type="button" onClick={() => {
                                        setSelectedRoutineId(routine.id);
                                        setShowExerciseLibrary(true);
                                    }}>
                                        + Add Exercises
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newName = window.prompt(
                                                "Enter a new name for this routine:",
                                                routine.name
                                            );

                                            if (newName === null || newName.trim() === "") {
                                                return;
                                            }

                                            const updatedRoutines = savedWorkouts.map((savedRoutine) => {
                                                if (savedRoutine.id === routine.id) {
                                                    return {
                                                        ...savedRoutine,
                                                        name: newName.trim()
                                                    };
                                                }

                                                return savedRoutine;
                                            });

                                            setSavedWorkouts(updatedRoutines);
                                        }}
                                    >
                                        Rename
                                    </button>

                                    <button
                                        className="delete-routine-button"
                                        type="button"
                                        onClick={() => deleteRoutine(routine.id)}
                                    >
                                        Delete Routine
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className="workout-header">
                <h2>{workoutName}</h2>

                <input type="text" value={workoutName}
                    onChange={(event) => setWorkoutName(event.target.value)}
                    placeholder="Enter workout name"
                />

                <p>Customize your workout routine.</p>
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