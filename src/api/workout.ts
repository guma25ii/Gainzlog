
import API_BASE from "./client";


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
export const getSessionById = async (sessionId: number) => {
    const response = await fetch(`${API_BASE}/Session/${sessionId}`, {
        method: "GET"
    });
    if(!response.ok){
        throw new Error("Failed To Find Session")
    }
    return response.json();
}

export const createExercise = async (name: string, sessionId: number, reps: number, sets: number, weight: number) => {
    const response = await fetch(`${API_BASE}/LoggedExercise/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, sessionId, reps, sets, weight})
    });
    if(!response.ok){
        throw new Error("Failed to Create Exercise");
    }
    return response.json();
}