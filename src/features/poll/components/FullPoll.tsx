import {
    AvatarGroup,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import {Question} from "../types";
import {User} from "../../user/types";
import UserBox from "../../user/components/UserBox";
import {useContext} from "react";
import {UserContext} from "../../user/contexts/UserContext";
export interface IFullPollProps {
    question: Question,
    users: Record<string, User>
    onAnswer?: (choice: "optionOne"|"optionTwo")=> void
}




const  FullPoll =({question, users,onAnswer}: IFullPollProps) => {

    const currentUser = useContext(UserContext);

    const handleCard = (card:"optionOne"|"optionTwo") => {
        if(onAnswer)
            onAnswer(card);
    }
    const fullCount = question.optionOne.votes.length + question.optionTwo.votes.length;
    const hasChose = currentUser?.answers?.hasOwnProperty(question.id);
    let choice=''
    if(hasChose) {
        if(currentUser!==undefined)
            if (currentUser.answers) {
                choice = currentUser.answers[question.id];
            }
    }


    return <Paper>
        <h1>Poll By <UserBox user={users[question.author]} /></h1>
        <h3>Would you rather...</h3>
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <Card variant="elevation" style={{backgroundColor: (hasChose && choice==='optionOne') ? 'green' : undefined}}>
                    <CardActionArea onClick={()=>handleCard("optionOne")} disabled={hasChose}>
                    <CardHeader title={question.optionOne.text}/>
                    <CardContent>
                        { hasChose && (
                        <div>
                        <Typography>{`${question.optionOne.votes.length} voted, ${Math.round((question.optionOne.votes.length / fullCount)*100)}%`}</Typography>
                        <AvatarGroup>
                        {question.optionOne.votes.map(userid => (
                            <UserBox user={users[userid]} key = {userid}/>
                        ))}
                        </AvatarGroup>
                        </div>  )}
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={2}>Or</Grid>
            <Grid item xs={5}>
                <Card variant="elevation" style={{backgroundColor: (hasChose && choice==='optionTwo') ? 'green' : undefined}}>
                <CardActionArea onClick={()=>handleCard("optionTwo")} disabled={hasChose}>
                    <CardHeader title={question.optionTwo.text}/>
                    <CardContent >
                        { hasChose && (
                            <div>
                        <Typography>{`${question.optionTwo.votes.length} voted, ${Math.round((question.optionTwo.votes.length / fullCount)*100)}%`}</Typography>
                        <AvatarGroup>
                        {question.optionTwo.votes.map(userid => (
                            <UserBox user={users[userid]} key={userid} />
                        ))}
                        </AvatarGroup>
                            </div>  )}
                    </CardContent>
            </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    </Paper>;
}

export  default FullPoll;