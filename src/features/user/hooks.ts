import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {User} from "./types";
import {createUserAsync} from "./userSlice";
import {useAppDispatch} from "../../app/hooks";

export const useUserState = () => {
    return useSelector((state: RootState)=> state.user.state);
}


export const useNewUser = () => {
    const dispatch=useAppDispatch();
    return {
        newUserStatus: useSelector((state:RootState) => state.user.create.state),
        error: useSelector((state:RootState)=>state.user.error.message),
        onSubmit: (user:User) => {
            dispatch(createUserAsync(user));
        }
    }
}