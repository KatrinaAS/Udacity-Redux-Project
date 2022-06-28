import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import {
    createTheme,
    CssBaseline, ThemeProvider, useMediaQuery,
} from "@mui/material";
import NavBar from "./components/navbar";
import Navigation from "./navigation";
import {UserProvider} from "./features/user/contexts/UserContext";
function App() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <UserProvider>
                <Router>
                    <div>
                        <NavBar  />
                    </div>
                <Navigation />
                </Router>
                </UserProvider>
            </div>
            </ThemeProvider>
        </>
    );
}

export default App;
