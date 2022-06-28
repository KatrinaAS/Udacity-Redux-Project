import {Question} from "../types";
import {Card, CardActionArea, CardHeader} from "@mui/material";
import {useNavigate} from "react-router-dom";

export interface IBasicPollProps {
    poll:Question
}
const BasicPoll = ( { poll }:IBasicPollProps) => {
    const navigate = useNavigate();
    return (<Card variant="elevation" sx = {{ m: 1}}>
        <CardActionArea onClick={()=>navigate('/questions/'+poll.id)}>
        <CardHeader title={poll.author} subheader={new Date(poll.timestamp).toLocaleString()} />
        </CardActionArea></Card>)
}


export default BasicPoll;