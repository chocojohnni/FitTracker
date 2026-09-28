import { useState } from "react";

function ExerciseCard({ id, name, sets, onAddSet, onUpdateSet }) {
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
                            onUpdateSet(
                                id,
                                index,
                                "weight",
                                event.target.value
                            )
                        }
                    />

                    <input 
                        type="number"
                        value={set.reps}
                        onChange={(event) =>
                            onUpdateSet(
                                id,
                                index,
                                "reps",
                                event.target.value
                            )
                        }
                    />
                </div>
            ))}

            <button onClick={onAddSet}>
                + Add Set
            </button>
        </div>
    );
}

export default ExerciseCard;