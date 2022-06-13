import homeImage from './pollImage.jpg'
import {Card, CardContent, CardMedia, Container, Typography} from "@mui/material";

const Home = () => {
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