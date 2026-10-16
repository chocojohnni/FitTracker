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

    const [savedWorkouts, setSavedWorkouts] = useState(() => {
        const savedRoutines = localStorage.getItem("savedWorkouts");

        if (!savedRoutines) {
            return [];
        }

        try {
            return JSON.parse(savedRoutines);
        } catch (error) {
            console.error("Could not load saved routines:", error);
            return [];
        }
    });

    const [activeWorkout, setActiveWorkout] = useState(() => {
        const savedWorkout = localStorage.getItem("activeWorkout");

        if (!savedWorkout) return null;

        try {
            return JSON.parse(savedWorkout);
        } catch (error) {
            console.error("Could not load active workout:", error);
            return null;
        }
    });

    useEffect(() => {
        if (activeWorkout) {
            localStorage.setItem("activeWorkout", JSON.stringify(activeWorkout));
        } else {
            localStorage.removeItem("activeWorkout");
        }
    }, [activeWorkout]);

    useEffect(() => {
        localStorage.setItem(
            "workoutHistory",
            JSON.stringify(workoutHistory)
        );
    }, [workoutHistory]);

    useEffect(() => {
        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(savedWorkouts)
        );
    }, [savedWorkouts]);

    return (
        <WorkoutContext.Provider
            value={{
                workoutHistory,
                setWorkoutHistory,
                savedWorkouts,
                setSavedWorkouts,
                activeWorkout,
                setActiveWorkout,
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