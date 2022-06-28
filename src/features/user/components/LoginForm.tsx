import {Alert, Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
export interface ILoginFormProps {
    onLogin: (user:{ username:string,password:string }) => void,
    error?: string|null,
    loading?: boolean
}

const LoginForm = ({onLogin, error, loading}:ILoginFormProps) => {
    const [username,setUsername] = useState<{value: string,error:null|string}>({value:'', error: null});
    const [password,setPassword] = useState<{value: string,error:null|string}>({value:'', error: null});

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(username.value.trim()===''){
            setUsername(state=> ({...state, error: 'Username must not be empty'}));
        } else {
            setUsername(state=> ({...state, error: null}));
        }
        if(password.value.trim()==='') {
            setPassword(state=> ({...state, error: 'Password must not be empty'}));
        }
        else {
            setPassword(state=> ({...state, error: null}));
        }

        if(username.error==null && password.error==null) {
            onLogin({username: username.value,password: password.value});
        }
    }
    return (<Paper>
        <Typography>Login here</Typography>
        <Container>
            {error && (
                <Alert severity="error">{error}</Alert>
            )}
            {username.error && (
                <Alert severity="error">{username.error}</Alert>
            )}
            {password.error && (
                <Alert severity="error">{password.error}</Alert>
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
                 onSubmit={onSubmit}
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
                        id="password"
                        label="Password"
                        type="password"
                        value={password.value}
                        onChange={(event)=> setPassword(state=> ({...state, value: event.target.value}))}
                        error={password.error!=null}
                        helperText={password.error!=null ? password.error : ""}
                    />
                </div>
                <Button
                    type="submit"
                    aria-label="Login"
                    sx={{
                        alignSelf: 'flex-end'
                    }}
                    disabled={loading}
                >Login</Button>
            </Box>
        </Container>
    </Paper>);
}

export default LoginForm;