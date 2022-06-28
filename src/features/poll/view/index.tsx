import {useParams} from "react-router-dom";
import {LoadingStates} from "../../lib/types";
import FullPoll from "../components/FullPoll";
import {useChooseQuestion,useLoadQuestion, useLoadQuestionStatus} from "../hooks";
import {useLoadUsers} from "../../user/hooks";
import {useLoginCheck} from "../../../lib/auth";


const View = () => {
    const { questionId } = useParams<string>();
    const question = useLoadQuestion(questionId as string);
    const questionState:LoadingStates = useLoadQuestionStatus();
    const users = useLoadUsers();
    const saveAnswer = useChooseQuestion();

    useLoginCheck();

    return (
        <>
            {questionState === LoadingStates.Requested && (
                <div>Loading</div>
            )}
            {question===undefined && (
                <h1>404 Question not found</h1>
            )}
            {question!== undefined && questionState === LoadingStates.Success && (
            <FullPoll question={question} users={users} onAnswer={(card) => {saveAnswer(questionId as string,card )}}/>
                )}


        </>
    )
}

export default View;