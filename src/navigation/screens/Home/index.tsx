import homeImage from './pollImage.jpg'
import {Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../../features/user/contexts/UserContext";

const Home = () => {
    const user=useContext(UserContext);
    if(user!==undefined)
        return <Outlet />
    return (<Container>
        <Card sx={{m: 2}}>
            <CardMedia
                component="img"
                height="500px"
                image={homeImage}
                alt="people discussing employee ratings"
            />
            <CardContent>
                <Typography>Welcome to the Employee Polls App. Please register using the first button on the top right.
                    If you already have an account, please login using the second button.</Typography>
            </CardContent>
        </Card>
    </Container>)
}

export default Home