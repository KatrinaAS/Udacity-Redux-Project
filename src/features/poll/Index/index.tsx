import {useClearStatus, useLoadPolls} from "../hooks";
import BasicPoll from "../components/BasicPoll";
import {Question} from "../types";
import {Box, Paper, Tab, Tabs} from "@mui/material";
import {useContext, useState} from "react";
import {UserContext} from "../../user/contexts/UserContext";

const Index = () => {
    const polls=useLoadPolls();
    const user = useContext(UserContext);
    const [tab,setTab] = useState(0);
    useClearStatus();
    if(user==null) {
        console.error("Somehow loaded index without a user")
        return <div>Error: Somehow loaded index without a user</div>
    }

    const newPolls = Object.keys(polls).filter( key => {
        const question:Question = polls[key];
        return !question.optionOne.votes.includes(user.id) && !question.optionTwo.votes.includes(user.id)
    }).reduce((previousValue, currentValue) => {
        previousValue.push(polls[currentValue])
        return previousValue;
    },[] as Array<Question>);

    const oldPolls = Object.keys(polls).filter(key => {
        const question:Question = polls[key];
        return (question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id) )
    }).reduce((previousValue, currentValue) => {
        previousValue.push(polls[currentValue])
        return previousValue;
    },[] as Array<Question>);

    newPolls.sort((a, b) => b.timestamp - a.timestamp )
    oldPolls.sort((a,b) => b.timestamp - a.timestamp)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    return (<Paper>

            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Unanswered Questions"  data-testid='unanswered' />
                <Tab label="Answered Questions" data-testid='answered'/>
            </Tabs>
            <Box hidden={tab!==0} data-testid="unanswered-box">
                <Paper>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {
                            newPolls.map(poll => poll!=null && <BasicPoll poll={poll}  key={poll.id}/>)
                        }
                    </Box>
                </Paper>
            </Box>

        <Box hidden={tab!==1} data-testid="answered-box">
            <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'  }} >
                    {
                        oldPolls.map(poll => poll!=null && <BasicPoll poll={poll} key={poll.id} />)
                    }
                </Box>
            </Paper>
        </Box>

    </Paper>)
}

export default Index;