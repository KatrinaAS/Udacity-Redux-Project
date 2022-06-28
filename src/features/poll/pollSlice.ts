import {PollState, Question} from "./types";
import {LoadingStates} from "../lib/types";
import {AnyAction, createAsyncThunk, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {_getQuestions, _saveQuestion, _saveQuestionAnswer} from "../../lib/_DATA";
import {RootState} from "../../app/store";
import {chooseQuestion as userChooseQuestion, newQuestion as userNewQuestion} from "../user/userSlice";

const initialState: PollState = {
    new: {state: LoadingStates.Pending},
    choose: {state: LoadingStates.Pending},
    error: {message: ""},
    questions: {},
    state: LoadingStates.Pending
};

export const loadPollsAsync = createAsyncThunk<
    Record<string,Question>,
    void,
    {
        rejectValue: string
    }
    >(
    'polls/loadPolls',
    async (_:any,thunkAPI) => {
        try {
            return await _getQuestions();
        } catch (e) {
            throw thunkAPI.rejectWithValue(e as string);
        }
    }
)




export const pollSlice =createSlice({
    name: 'poll',
    initialState,
    reducers: {
        setQuestion: (state,action:PayloadAction<Question>) =>
        {
            state.questions[action.payload.id]=action.payload;
        },
        addPollError: (state, action: PayloadAction<string>) =>
        {
            state.new.state=LoadingStates.Failure;
            state.error.message=action.payload;
        },
        addPollStatus:(state, action: PayloadAction<LoadingStates>) => {
            state.new.state = action.payload;
}
    },
    extraReducers: builder => {
        builder
            .addCase(loadPollsAsync.pending, (state) => {
                state.state=LoadingStates.Requested;
            })
            .addCase(loadPollsAsync.fulfilled, (state, action: PayloadAction<Record<string, Question>>) => {
                state.state=LoadingStates.Success;
                state.error.message="";
                state.questions=action.payload;
            })
            .addCase(loadPollsAsync.rejected, (state, action) => {
                state.state=LoadingStates.Failure;
                state.error.message=action.payload;
            })

    }
})

export const newPoll = (optionOneText:string,optionTwoText:string) :ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        try {
            dispatch(pollSlice.actions.addPollStatus(LoadingStates.Requested));
            const currentUser = (getState().user.currentUserId);
            const newQuestion = await _saveQuestion({author: currentUser, optionOneText, optionTwoText});
            dispatch(pollSlice.actions.setQuestion(newQuestion));
            dispatch(userNewQuestion(newQuestion.id));
            dispatch(pollSlice.actions.addPollStatus(LoadingStates.Success));
        } catch (e) {
            dispatch(pollSlice.actions.addPollError(e as string));
        }

    }
}

export const chooseQuestion = (params:{questionId: string, choice: "optionOne"|"optionTwo"}): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const currentUser = (getState().user.currentUserId);
        await _saveQuestionAnswer({authedUser: currentUser, qid: params.questionId, answer: params.choice});
        dispatch(pollSlice.actions.setQuestion({
            ...getState().poll.questions[params.questionId],
            [params.choice] : {
                ...getState().poll.questions[params.questionId][params.choice],
                votes: getState().poll.questions[params.questionId][params.choice].votes.concat([currentUser])

        }
        }));
        dispatch(userChooseQuestion({questionID: params.questionId, choice: params.choice}));
    }
}



export const {addPollStatus} = pollSlice.actions;

export default pollSlice.reducer;