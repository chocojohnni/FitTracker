import { createContext, useContext, useEffect, useState } from "react";

const WorkoutContext = createContext();

function WorkoutProvider({ children }) {
    const [workoutHistory, setWorkoutHistory] = useState(() => {
        const savedHistory = localStorage.getItem("workoutHistory");

        if (!savedHistory) {
            return [];
        }

        try {
            return JSON.parse(savedHistory);
        } catch (error) {
            console.error("Could not load workout history:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "workoutHistory",
            JSON.stringify(workoutHistory)
        );
    }, [workoutHistory]);

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