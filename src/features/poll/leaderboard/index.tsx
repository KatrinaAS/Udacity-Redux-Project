import {useLoginCheck} from "../../../lib/auth";
import {useLoadUsers} from "../../user/hooks";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {User} from "../../user/types";
import {Paper} from "@mui/material";
import UserBox from "../../user/components/UserBox";

const Leaderboard = () => {

    const columns: GridColDef[] = [
        { field: 'User', headerName: 'User', width: 150,
            editable: false,
        renderCell: (params) => {
            return <UserBox user={params.row} />},
            valueGetter: (params) => (params.row as User).name
        },

        {
            field: 'Answered', headerName: 'Answered',
            editable: false,
            valueGetter: (params) => Object.keys((params.row as User).answers).length
        },
        {
            field: 'Questions', headerName: 'Questions',
            editable: false,
            valueGetter: (params) => (params.row as User).questions.length
        }
        ]


    useLoginCheck();
    const users = useLoadUsers();
    const sortedusers = Object.keys(users).sort((a,b) => {
            return (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length);
    }).reduce((previousValue,currentValue) => {
        previousValue.push(users[currentValue]);
        return previousValue;
    }, [] as Array<User>);
    return (<Paper sx={{ height: 400, width: '100%' }}>
        <h1>Leaderboard</h1>
        <DataGrid  rows={sortedusers} columns={columns}/></Paper>)
}
export default Leaderboard;