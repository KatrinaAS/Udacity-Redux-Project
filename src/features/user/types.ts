import {LoadingStates} from "../lib/types";


export interface User {
    id: string,
    password: string,
    name: string,
    avatarURL?: string|null,
    answers?: Record<string, string>,
    questions?: Array<string>
}


export interface UsersState {
    users: Record<string, User>
    currentUserId: string,
    state: LoadingStates
    create: {
        state: LoadingStates
    }
    error: {
        message: string|null|undefined
    }

}
