import React from 'react';
import Home from './screens/Home'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './App.css';
import {
    CssBaseline,
} from "@mui/material";
import {useCurrentUser} from "./lib/auth";
import NavBar from "./components/navbar";
import NonAuthComponent from "./navigation/components/NonAuthComponent";
import Register from "./screens/Register";

function App() {
        const currentUser = useCurrentUser();
    return (
        <>
            <CssBaseline/>
            <div>
                <Router>
                    <div>
                        <NavBar currentUser={currentUser} />
                    </div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<NonAuthComponent />} >
                            <Route index={true} element={<Register  />} />
                        </Route>
                    </Routes>
                </Router>

            </div>
        </>
    );
}

export default App;
