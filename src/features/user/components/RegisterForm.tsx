import {Alert, Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";

export interface IRegisterFormProps {
    onFormSubmit: (user:{username: string,name: string,password: string})=>void
    error? : string| null
    success?: boolean,
    loading? : boolean
}
const RegisterForm = ({onFormSubmit, error,success, loading}: IRegisterFormProps) => {
    const [username,setUsername] = useState<{value: string,error:null|string}>({value:'', error: null});
    const [name,setName] = useState<{value: string,error:null|string}>({value:'', error: null});
    const [password,setPassword] = useState<{value: string,error:null|string}>({value:'', error: null});
    const [password_confirmation,setPasswordConfirmation] = useState<{value: string,error:null|string}>({value:'', error: null});


    const submitForm=(event: { preventDefault: () => void; })=>{
        event.preventDefault();
        const passwordMustMatchConfirmation='Password must match confirmation';
        const passwordMustHaveLength='Password must be six letters';
        const usernameRequired='Username is required';
        const nameRequired='Name is required';
        if(password.value!==password_confirmation.value) {
            setPassword(state=> ({...state, error: passwordMustMatchConfirmation}));
            setPasswordConfirmation(state=> ({...state, error: passwordMustMatchConfirmation}));

        } else if(password.value.trim().length < 6) {
            setPassword(state=> ({...state, error: passwordMustHaveLength}));
        }  else {
            setPassword(state=> ({...state, error: null}));
            setPasswordConfirmation(state=> ({...state, error: null}));
        }

        if(username.value.trim()==='') {
            setUsername(state => ({...state, error: usernameRequired}));
        }
        else {
            setUsername(state => ({...state, error: null}));
        }

        if(name.value.trim()==='') {
            setName(state => ({...state, error: nameRequired}));
        } else {
            setName(state => ({...state, error: null}));
        }

        onFormSubmit({
            username: username.value,
            password: password.value,
            name: name.value
        });

    }

    return (
        <Paper>
            <Typography>Register a new User here</Typography>
            <Container>
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}
                {username.error && (
                    <Alert severity="error">{username.error}</Alert>
                )}
                {name.error && (
                    <Alert severity="error">{name.error}</Alert>
                )}
                {password.error && (
                    <Alert severity="error">{password.error}</Alert>
                )}
                {success && (
                    <Alert severity="success">User has been created</Alert>
                )}
            <Box component="form"
                 sx={{
                     '& .MuiTextField-root': { m: 1, width: '25ch' },
                 }}
                 m={1}
                 display="flex"
                 justifyContent="space-between"
                 alignItems="center"
                 flexDirection="column"
                 onSubmit={submitForm}
            >
                <div>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        value={username.value}
                        onChange={(event)=> setUsername(state=> ({...state, value: event.target.value}))}
                        error={username.error!=null}
                        helperText={username.error!=null ? username.error : ""}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="full_name"
                        label="Full Name"
                        value={name.value}
                        onChange={(event)=> setName(state=> ({...state, value: event.target.value}))}
                        error={name.error!=null}
                        helperText={name.error!=null ? name.error : ""}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        value={password.value}
                        onChange={(event)=> setPassword(state=> ({...state, value: event.target.value}))}
                        error={password.error!=null}
                        helperText={password.error!=null ? password.error : ""}
                    />
                    <TextField
                        required
                        id="password_confirmation"
                        label="Password Confirmation"
                        type="password"
                        value={password_confirmation.value}
                        onChange={(event)=> setPasswordConfirmation(state=> ({...state, value: event.target.value}))}
                        error={password_confirmation.error!=null}
                        helperText={password_confirmation.error!=null ? password_confirmation.error : ""}
                    />
                </div>
                <Button
                    type="submit"
                    aria-label="Register"
                    disabled={loading}
                    sx={{
                        alignSelf: 'flex-end'
                    }}
                >Register</Button>
            </Box>
            </Container>

        </Paper>
    )
}

export default RegisterForm;