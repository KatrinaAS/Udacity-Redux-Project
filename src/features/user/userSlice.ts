import {UsersState} from "./types";
import {LoadingStates} from "../lib/types";


const initialState: UsersState = {
    currentUserId: "",
    state: LoadingStates.Pending,
    users: {}

}
