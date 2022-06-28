import {Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import React from "react";
import LoginScreen from "./screens/Users/Login";
import RegisterScreen from "./screens/Users/Register";
import Index from "./screens/Polls/Index";
import ViewScreen from "./screens/Polls/view";
import LeaderboardScreen from "./screens/Polls/Leaderboard";
import NewScreen from "./screens/Polls/New";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route index element={<Index/>} />
            </Route>
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/questions/:questionId" element={<ViewScreen />} />
            <Route path="/leaderboard" element={<LeaderboardScreen />} />
            <Route path="/add" element={<NewScreen />} />
        </Routes>
    );
}

export default Navigation;