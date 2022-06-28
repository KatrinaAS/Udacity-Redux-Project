import {Container} from "@mui/material";
import LoginForm from "../components/LoginForm";
import {useLoadUsers, useLoadUsersStatus,  useLoginUser} from "../hooks";
import {LoadingStates} from "../../lib/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";

const Login = () => {

    const login=useLoginUser();
    useLoadUsers();
    const userState=useLoadUsersStatus();
    const redirect = useSelector((state:RootState) => state.user.redirectURL);
    const currentUser = useContext(UserContext);
    const loginUser =(user: { username:string,password:string }) => {
    login.onLogin(user);
    }
    if(currentUser!==undefined) {
        if(redirect!=="") {
            return <Navigate to={redirect} replace />
        }
        return <Navigate to={"/"} replace />
    }
    return (<Container>
        {userState===LoadingStates.Success && (
        <LoginForm onLogin={loginUser} error={login.error} loading={login.loginUserStatus===LoadingStates.Requested} />
            )}
    </Container>);
}

export default Login;