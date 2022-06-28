import {createContext, FC, ReactNode} from "react";
import {User} from "../types";
import {useCurrentUser} from "../../../lib/auth";

export const UserContext = createContext<User|undefined>(undefined)

export interface IUserProviderProps {
    children: ReactNode
}
export const UserProvider: FC<IUserProviderProps> = ({children}) => {
    const currentUser = useCurrentUser();

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
}