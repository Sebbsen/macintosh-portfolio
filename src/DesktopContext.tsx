import React, { useContext, useState } from "react";

const DesktopContext = React.createContext({});

export const useDesktopContext = () => {
    return useContext(DesktopContext)
}

type DesktopContextProps = {
    childern: object
}

export const DesktopProvider = ({ childern }: DesktopContextProps) => {

    const defaultWindows = [
        {
            type: 'note',
            id: 0,
            title:'Note - Todos',
            content: '- A̶d̶d̶ ̶D̶r̶a̶g̶D̶r̶o̶p̶ \n- A̶d̶d̶ ̶N̶o̶t̶e̶ \n- A̶d̶d̶ ̶A̶b̶o̶u̶t̶ ̶M̶e̶ \n- Implement game \n- Add 3D model \n- Safe state local',
            defaultPosition: {x:31, y: 24},
            width: '190px',
            zIndex: 1,
            isHidden: false,
        },
        {
            type: 'about',
            id: 3,
            title:'About Me',
            defaultPosition: {x:95, y: 95},
            width: '375px',
            zIndex: 2,
            isHidden: false,
        }
    ]

    const [windowsState, setWindowsState] = useState(defaultWindows)

    const handleActiveWindow = (id: number) => {
        let windowArray = [...windowsState];
        let clickedWindowZIndex = windowArray[windowArray.findIndex((singleWindow => singleWindow.id == id))].zIndex;
        windowArray = windowArray.map(singleWindow => {
            let newZIndex;

            if (singleWindow.id === id) {
                newZIndex = windowsState.length;  
            } else if ( singleWindow.zIndex > clickedWindowZIndex) {
                newZIndex = singleWindow.zIndex !== 1 ? singleWindow.zIndex - 1 : 1;
            } else {
                newZIndex = singleWindow.zIndex
            }

            singleWindow.zIndex = newZIndex;

            return singleWindow;
        });
        setWindowsState(windowArray);
    }

    const handleCloseWindow = (id:number) => {
        let windowArray = [...windowsState];
        windowArray = windowArray.map(singleWindow => {
            let newZIndex;

            if (singleWindow.id === id) {
                newZIndex = 1; 
                singleWindow.isHidden = true; 
            } else {
                newZIndex = singleWindow.zIndex + 1;
            }

            singleWindow.zIndex = newZIndex;

            return singleWindow;
        });
        
        setWindowsState(windowArray);
    }

    return (
        <DesktopContext.Provider value={[windowsState, handleActiveWindow, handleCloseWindow]}>
            {childern}
        </DesktopContext.Provider>
    )

}