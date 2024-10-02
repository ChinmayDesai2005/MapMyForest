/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [user,setUser] = useState();
    const[selectedProject,setSelectedProject] = useState();

    return(
        <UserContext.Provider value={{user,setUser,selectedProject,setSelectedProject}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserState = () => {
    return useContext(UserContext);
}

export default UserProvider;