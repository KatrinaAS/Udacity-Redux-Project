import {Avatar, Box} from "@mui/material";
import {User} from "../types";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
export interface IUserBoxProps {
    user:User
}
const UserBox = ({user}:IUserBoxProps) => {
    return ( <Box sx={{ display: 'flex' }}><Avatar alt={user.name} src={user.avatarURL ==null ? undefined : (user.avatarURL as string)}  {...(user.avatarURL ==null?stringAvatar(user.name) : {} )}/>{user.name}</Box>)
}

export default UserBox;