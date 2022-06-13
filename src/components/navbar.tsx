import {AppBar, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import {AppRegistration, Login} from "@mui/icons-material";
import React from "react";
import {User} from "../features/user/types";
import {useNavigate} from "react-router-dom";

const NavBar = ({currentUser}: {currentUser: User|null}) => {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar>
                {currentUser!=null && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuItem />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Employee Polls
                </Typography>
                {currentUser==null && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="register"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={()=> navigate("/register")}
                            color="inherit"
                            >
                            <AppRegistration/>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="Login"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={()=> navigate("/login")}
                            color="inherit" >
                            <Login/>
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;