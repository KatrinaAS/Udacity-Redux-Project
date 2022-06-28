import RegisterForm from "../components/RegisterForm";
import {Container} from "@mui/material";
import {User} from "../types";
import {useNewUser} from "../hooks";
import {LoadingStates} from "../../lib/types";

const Register = () => {
    const registerUser = useNewUser();

    const registerFormSubmit = ({username, name, password}: {username: string, name: string, password: string}) => {
        const user: User = {
            id: username,
            password: password,
            name: name,
            answers: {},
            questions: []
        }
        registerUser.onSubmit(user);
    }

    return (
        <Container>

            <RegisterForm  onFormSubmit={registerFormSubmit} error={registerUser.error} success={registerUser.newUserStatus===LoadingStates.Success} loading={registerUser.newUserStatus===LoadingStates.Requested}/>
        </Container>
    )
}

export default Register;