import { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

function WorkoutProvider({ children }) {
    const [workoutHistory, setWorkoutHistory] = useState([]);

    return (
        <WorkoutContext.Provider
            value={{
                workoutHistory,
                setWorkoutHistory
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
}

function useWorkout() {
    return useContext(WorkoutContext);
}

export { WorkoutProvider, useWorkout };