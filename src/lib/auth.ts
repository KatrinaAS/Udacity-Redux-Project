import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {useContext, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "../features/user/contexts/UserContext";
import {useAppDispatch} from "../app/hooks";
import {setRedirect} from "../features/user/userSlice";

export const useCurrentUser = () => {
    const user= useSelector((state:RootState) => state.user.users[state.user.currentUserId]);
    return user;
}

export const useLoginCheck = () => {
    const navigate = useNavigate();
    const user=useContext(UserContext);
    const dispatch = useAppDispatch();
    const location = useLocation();
    useEffect(() => {
        if(user===undefined) {
            dispatch(setRedirect(location.pathname))
            navigate("/login");
        }
    }, [dispatch, location.pathname, navigate, user])
}