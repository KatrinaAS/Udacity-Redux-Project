import {useCurrentUser} from "../../lib/auth";
import {Outlet, useNavigate} from "react-router-dom";

const NonAuthComponent = () => {
    const user=useCurrentUser();
    const navigate = useNavigate();
    if(user!=null)
        navigate("/"); // TODO: Make this point to "/polls"
    return (
        <Outlet/>
    )
}

export default NonAuthComponent;