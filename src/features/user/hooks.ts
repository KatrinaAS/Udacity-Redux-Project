import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {User} from "./types";
import {createUserAsync, loadUsersAsync, loginUserAsync, logout} from "./userSlice";
import {useAppDispatch} from "../../app/hooks";
import {useEffect} from "react";

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


export const useLoadUsers=() => {
    const dispatch=useAppDispatch();
    useEffect(()=> {
        dispatch(loadUsersAsync())
    },[dispatch]);
    return useSelector((state:RootState)=>state.user.users);
}

export const useLoadUsersStatus=()=> {
    return useSelector((state:RootState)=>state.user.state);
}

export const useLoginUser = () => {
    const dispatch = useAppDispatch();
    return {
        loginUserStatus: useSelector((state:RootState) => state.user.login.state),
        error: useSelector((state:RootState)=>state.user.error.message),
        onLogin: (loginDetails: {username: string,password: string}) => dispatch(loginUserAsync(loginDetails))
    }
}

export const useLogoutUser = ()=> {
    const dispatch = useAppDispatch();
    return () => dispatch(logout(''));
}