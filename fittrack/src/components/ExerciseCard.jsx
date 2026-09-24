function ExerciseCard({ name }) {
    return (
        <div className="exercise-card">
            <h3>{name}</h3>

            <div className="sets-header">
                <span>Set</span>
                <span>Weight</span>
                <span>Reps</span>
            </div>

            <div className="set-row">
                <span>1</span>
                <span>185 lb</span>
                <span>8</span>
            </div>

            <div className="set-row">
                <span>2</span>
                <span>185 lb</span>
                <span>8</span>
            </div>

            <div className="set-row">
                <span>3</span>
                <span>185 lb</span>
                <span>7</span>
            </div>

            <button>+ Add Set</button>
        </div>
    );
}

export default ExerciseCard;