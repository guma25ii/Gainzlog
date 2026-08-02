
import API_BASE from "./client";
import type { ExerciseDetails, ExerciseSummary, Muscle, Session, WorkoutExercise } from "../types/workoutTypes";




//Program//



export async function getAllPrograms(){
    const response = await fetch(`${API_BASE}/Program`);

    if(!response.ok){
        throw new Error("Failed To Fetch Programs")
    }
    return response.json();
}

export const createProgram = async( name : string) => {
    const response = await fetch(`${API_BASE}/Program`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if(!response.ok){
        throw new Error("Failed To Create Program")
    };
    
    return response.json();
};
export const deleteProgram = async (ProgramId: number) => {
    const response = await fetch(`${API_BASE}/Program/${ProgramId}`, {
        method: "DELETE"
    });
    if(!response.ok)
    {
        throw new Error("Failed To Delete Program");
    };
    return response.json();
};

export const getProgramById = async ( ProgramId: number) => {
    const response = await fetch(`${API_BASE}/Program/${ProgramId}`,{
        method: "GET"
    });
    if(!response.ok){
        throw new Error("Failed To Find Program");
    };
    return response.json();
};



//Session//


export const getAllSessions = async (): Promise<Session[]>   => {
    const response = await fetch(`${API_BASE}/Session`,)
    if(!response.ok){
        throw new Error("Failed To Get All Sessions")
    }
    return response.json();
}


export const createSession = async (name: string, programId: number | null) => {
    const response = await fetch(`${API_BASE}/Session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, programId})
    });
    if(!response.ok){
        throw new Error("Could Not Create Session");
    }
    return response.json()
}
export const getSessionById = async (sessionId: number): Promise<Session> => {
    const response = await fetch(`${API_BASE}/Session/${sessionId}`, {
        method: "GET"
    });
    if(!response.ok){
        throw new Error("Failed To Find Session")
    }
    return response.json();
}

export const deleteSession = async (sessionId: number) => {
    const response = await fetch(`${API_BASE}/Session/${sessionId}`, {
        method: "DELETE"
    })
    if (!response.ok){
        throw new Error("Failed To Delete Session");
    }
    return response.json();
}



//Exercise//


export const getAllMuscles = async (): Promise<Muscle[]> => {
    const response = await fetch(`${API_BASE}/Exercise/getAllMuscles`,)
    if(!response.ok){
        throw new Error("Failed To Get Exercises")
    }
    return response.json();



}

export const getExercisesByBodypart = async (bodypart: string):Promise <ExerciseSummary[]> => {
    const response = await fetch(`${API_BASE}/Exercise/getExerciseByBodypart?targetMuscles=${bodypart}`, {
        method: "GET"
    })
    if(!response.ok){
        throw new Error("Failed to Get Exercises By Bodypart")
    }
    return response.json();
}
export const getExerciseInfo = async (information: string):Promise <ExerciseDetails> => {
    const response = await fetch(`${API_BASE}/Exercise/${information}/exerciseInfo`, {
        method: "GET"
    })
    if(!response.ok){
        throw new Error("Failed to Get Exercise Info")
    }
    return response.json();

}



export const createExercise = async (name: string, exerciseId: string, sessionId: number, reps: number, sets: number, weight: number) => {
    const response = await fetch(`${API_BASE}/LoggedExercise/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, exerciseId, sessionId, reps, sets, weight})
    });
    if(!response.ok){
        throw new Error("Failed to Create Exercise");
    }
    return response.json();
}



//Set//



export const createSet = async (workoutExerciseId: number, reps: number, weight: number) => {
    const response = await fetch(`${API_BASE}/Set`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({workoutExerciseId, reps, weight})
    });
    if(!response.ok){
        throw new Error("Failed To Create Set");
    }
    return response.json();
}

export const updateSet = async (setId: number, reps: number, weight: number) => {
    const response = await fetch (`${API_BASE}/Set/${setId}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({reps, weight})
    });
    if(!response.ok){
        throw new Error("Failed To Update Set");
    }
    return response.json();
}

export const deleteSet = async (setId: number) => {
    const response = await fetch(`${API_BASE}/Set/${setId}`,{
        method: "DELETE"
    });
    if(!response.ok){
        throw new Error("Failed To Delete Set");
    }
    return response.json();
}