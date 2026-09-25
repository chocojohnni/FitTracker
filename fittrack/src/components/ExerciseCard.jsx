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

    function updateSet(index, field, value) {
        const updatedSets = [...sets];

        updatedSets[index][field] = value;

        setSets(updatedSets);
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
                    
                    <input 
                        type="number"
                        value={set.weight}
                        onChange={(event) =>
                            updateSet(index, "weight", event.target.value)
                        }
                    />

                    <input 
                        type="number"
                        value={set.reps}
                        onChange={(event) => 
                            updateSet(index, "reps", event.target.value)
                        }
                    />
                </div>
            ))}

            <button onClick={addSet}>+ Add Set</button>
        </div>
    );
}

export default ExerciseCard;