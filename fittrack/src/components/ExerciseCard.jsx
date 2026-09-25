import { useState } from "react";

function ExerciseCard({ name }) {
    const [sets, setSets] = useState([
        { weight: 185, reps: 8},
        { weight: 185, reps: 8},
        { weight: 185, reps: 7}
    ]);

    function addSet() {
        setSets([
            ...sets,
            { weight: 0, reps: 0 }
        ]);
    }

    return (
        <div className="exercise-card">
            <h3>{name}</h3>

            <div className="sets-header">
                <span>Set</span>
                <span>Weight</span>
                <span>Reps</span>
            </div>

            {sets.map((set, index) => (
                <div className="set-row" key={index}>
                    <span>{index + 1}</span>
                    <span>{set.weight} lb</span>
                    <span>{set.reps}</span>
                </div>
            ))}

            <button onClick={addSet}>+ Add Set</button>
        </div>
    );
}

export default ExerciseCard;