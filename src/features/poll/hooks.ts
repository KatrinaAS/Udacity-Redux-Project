import {useAppDispatch} from "../../app/hooks";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {addPollStatus, chooseQuestion, loadPollsAsync, newPoll} from "./pollSlice";
import {LoadingStates} from "../lib/types";


export const useLoadPolls=() => {
    const dispatch=useAppDispatch();
    useEffect(()=> {
        dispatch(loadPollsAsync())
    },[dispatch]);
    return useSelector((state:RootState)=>state.poll.questions);
}

export const useLoadPollsStatus=()=> {
    return useSelector((state:RootState)=>state.poll.state);
}

export const useLoadQuestion = (questionID: string) => {
    const dispatch=useAppDispatch();
    useEffect(()=> {
        dispatch(loadPollsAsync());
    },[dispatch])
    return useSelector((state:RootState) => state.poll.questions[questionID]);
}

export const useLoadQuestionStatus = () => {
    return useSelector((state:RootState) => state.poll.state)
}

export const useChooseQuestion = () => {
    const dispatch = useAppDispatch();
    return (questionID: string, card: "optionOne"|"optionTwo") => {
        dispatch(chooseQuestion({questionId: questionID, choice: card}));
    }
}
export const useClearStatus=() => {
    const dispatch = useAppDispatch();
    const status= useSelector((state:RootState) => state.poll.new.state);
    useEffect(()=> {
        if(status!=LoadingStates.Pending)
            dispatch(addPollStatus(LoadingStates.Pending));
    },[dispatch])
}
export const useNewPoll = () => {
    const dispatch = useAppDispatch();
    return {
        newPollStatus: useSelector((state:RootState) => state.poll.new.state),
        error: useSelector((state:RootState)=>state.poll.error.message),
        onNew: (pollDetails: {optionOne: string,optionTwo: string}) => dispatch(newPoll(pollDetails.optionOne,pollDetails.optionTwo))
    }
}