import ExerciseCard from "../components/ExerciseCard";

function Workouts() {
    return (
        <main classNam="workout-page">
            <section className="workout-header">
                <h2>Push Day</h2>
                <p>Chest • Shoulders • Triceps</p>
            </section>

            <section className="exercises">
                <ExerciseCard name="Bench Press" />

                <ExerciseCard name="Incline Dumbbell Press" />

                <ExerciseCard name="Shoulder Press" />
            </section>

            <button className="add-exercise-button">
                + Add Exercise
            </button>

            <button className="finish-workout-button">
                Finish Workout
            </button>
        </main>
    );
}

export default Workouts;