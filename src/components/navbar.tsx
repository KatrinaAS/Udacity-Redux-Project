import {
    AppBar,
    IconButton,
    Drawer,
    Toolbar,
    Typography,
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText, ListItem, List
} from "@mui/material";
import {AppRegistration, Create, Home, Login, Logout, Menu, Scoreboard} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLogoutUser} from "../features/user/hooks";
import {UserContext} from "../features/user/contexts/UserContext";

const NavBar = () => {
    const [open, setOpen]= useState(false);
    const navigate = useNavigate();
    const logout = useLogoutUser();
    const currentUser = useContext(UserContext);
    return (
        <AppBar position="static">
            <Toolbar>
                {currentUser!==undefined && (
                    <>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=>setOpen(true)}

                    >
                        <Menu />
                    </IconButton>
                    <Drawer
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={()=> setOpen(false)}
                            onKeyDown={()=> setOpen(false)}
                        >
                            <List>
                                <ListItem>
                                    <ListItemButton
                                        onClick={()=> navigate("/")}
                                    >
                                        <ListItemIcon>
                                            <Home/>
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton
                                        onClick={()=> navigate("/leaderboard")}
                                    >
                                        <ListItemIcon>
                                            <Scoreboard/>
                                        </ListItemIcon>
                                        <ListItemText primary="Leaderboard" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton
                                        onClick={()=> navigate("/add")}
                                    >
                                        <ListItemIcon>
                                            <Create/>
                                        </ListItemIcon>
                                        <ListItemText primary="New" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    </>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Employee Polls
                </Typography>
                {currentUser!==undefined && (
                    <div>
                        <Typography>{currentUser.name}</Typography>
                        <IconButton size="large"
                                    aria-label="register"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={logout}
                                    color="inherit"
                        ><Logout/></IconButton>
                    </div>
                )}
                {currentUser===undefined && (
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
                            color="inherit">
                            <Login/>
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;