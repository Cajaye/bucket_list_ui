import { createContext, useState } from "react";

export const userDetailsContext = createContext();

const UserDetailsProvider = ({ children }) => {
    const [listCount, setListCount] = useState()

    return (
        <userDetailsContext.Provider value={[listCount, setListCount]}>
            {children}
        </userDetailsContext.Provider>
    )
}

export default UserDetailsProvider

