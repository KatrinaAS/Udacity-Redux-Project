import {LoadingStates} from "../lib/types";

export interface Option {
    votes:Array<string>,
    text: string
}

export interface Question {
    id: string,
    author: string,
    timestamp: number,
    optionOne: Option,
    optionTwo: Option
}

export interface PollState {
    questions: Record<string, Question>
    state: LoadingStates
    error: {
        message: string|null|undefined
    }
    choose: {
        state: LoadingStates
    },
    new: {
        state:LoadingStates
    }
}