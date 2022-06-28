import {User, UsersState} from "./types";
import {LoadingStates} from "../lib/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {_addUser, _getUsers, _loginUser} from "../../lib/_DATA";


const initialState = {
    currentUserId: "",
    state: LoadingStates.Pending,
    users: {},
    create: {
        state: LoadingStates.Pending
    },
    error: {
        message: null
    },
    login: {
        state: LoadingStates.Pending
    },
    redirectURL: ""
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

export const loginUserAsync = createAsyncThunk<User,{username: string, password:string}, {rejectValue:string}>(
    'user/loginUser',
    async (login: {username: string, password:string},thunkAPI) => {
        try{
            return await _loginUser(login);
        } catch (e) {
            throw thunkAPI.rejectWithValue(e as string);
        }
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.currentUserId=""
        },
        chooseQuestion: (state, action:PayloadAction<{questionID: string, choice: "optionOne"|"optionTwo"}>) => {
            // @ts-ignore
            state.users[state.currentUserId].answers[action.payload.questionID]=action.payload.choice;
        },
        newQuestion: (state, action: PayloadAction<string>) => {
            state.users[state.currentUserId].questions= state.users[state.currentUserId].questions.concat(action.payload)
        },
        setRedirect: (state, {payload}:PayloadAction<string>) => {
            state.redirectURL=payload;
        }
    },
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
            }) // LoginUserAsync
            .addCase(loginUserAsync.pending, (state) => {
                state.login.state=LoadingStates.Requested;
            })
            .addCase(loginUserAsync.fulfilled,(state,action:PayloadAction<User>)=> {
                state.login.state=LoadingStates.Success;
                state.error.message=null;
                state.currentUserId=action.payload.id.toLowerCase();
            })
            .addCase(loginUserAsync.rejected,(state, action) =>{
                state.login.state=LoadingStates.Failure;
                state.error.message=action.payload;
            })
    }
})
export const { logout, chooseQuestion, setRedirect, newQuestion } = userSlice.actions;

export default userSlice.reducer;