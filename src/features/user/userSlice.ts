import {User, UsersState} from "./types";
import {LoadingStates} from "../lib/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {_addUser, _getUsers} from "../../lib/_DATA";


const initialState = {
    currentUserId: "",
    state: LoadingStates.Pending,
    users: {},
    create: {
        state: LoadingStates.Pending
    },
    error: {
        message: null
    }
} as UsersState;

export const createUserAsync = createAsyncThunk<
    User,
    User,
    {
        rejectValue: string
    }
    >(
    'user/createUser',
    async (user: User, thunkAPI) => {
        try {
            return await _addUser(user);
        } catch (e) {
            throw thunkAPI.rejectWithValue(e as string);
        }
    }
);


export const loadUsersAsync = createAsyncThunk<Record<string,User>,void,{rejectValue: string}>(
    'user/loadUsers',
    async (_:any,thunkAPI) => {
        try {
            return await _getUsers();
        }
        catch(e) {
            throw thunkAPI.rejectWithValue(e as string);
        }
    }
)
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder // CreateUserAsync reducers
            .addCase(createUserAsync.pending, (state) => {
                state.create.state = LoadingStates.Requested;
            })
            .addCase(createUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
                state.create.state = LoadingStates.Success;
                state.users = {
                    ...state.users,
                    [action.payload.id.toLowerCase()]: action.payload
                }
                state.error.message=null
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.create.state = LoadingStates.Failure
                console.error(action.payload);
                state.error.message=action.payload;
            }) // LoadUsersAsync reducers
            .addCase(loadUsersAsync.pending, (state => {
                state.state=LoadingStates.Requested;
            }))
            .addCase(loadUsersAsync.fulfilled, (state, action: PayloadAction<Record<string,User>>) => {
                state.state=LoadingStates.Success;
                state.users=action.payload;
                state.error.message=null
            })
            .addCase(loadUsersAsync.rejected,(state, action) => {
                state.state=LoadingStates.Failure
                state.error.message = action.payload;
            })
    }
})


export default userSlice.reducer;