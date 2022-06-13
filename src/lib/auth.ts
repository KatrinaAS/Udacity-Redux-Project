import {useSelector} from "react-redux";
import {RootState} from "../app/store";

export const useCurrentUser = () => {
    const userID = useSelector((state:RootState) => state.user.currentUserId);
    const user= useSelector((state:RootState) => state.user.users[userID]);
    if(!userID)
        return null;
    return user;
}