import PollForm from "../components/PollForm";
import {useNewPoll} from "../hooks";
import {LoadingStates} from "../../lib/types";
import {Navigate} from "react-router-dom";
import {useLoginCheck} from "../../../lib/auth";

const New=()=>{
    useLoginCheck();
    const newPoll = useNewPoll();
    const addPoll = (optionOne: string, optionTwo: string) => {
        newPoll.onNew({optionOne, optionTwo});
    }
    if(newPoll.newPollStatus===LoadingStates.Success)
        return <Navigate to={"/"} />
    return (<PollForm onAdd={addPoll}></PollForm>);
}

export default New;