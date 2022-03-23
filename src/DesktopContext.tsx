import React, { useContext, useState } from "react";

const DesktopContext = React.createContext({});

export const useDesktopContext = () => {
    return useContext(DesktopContext)
}

type DesktopContextProps = {
    childern: object
}

export const DesktopProvider = ({ childern }: DesktopContextProps) => {

    const [darkTheme, setDarkTheme] = useState(true)

    const myContextFunction = () => {
        setDarkTheme(darkTheme => !darkTheme)
    }

    return (
        <DesktopContext.Provider value={[darkTheme, myContextFunction]}>
            {childern}
        </DesktopContext.Provider>
    )

}