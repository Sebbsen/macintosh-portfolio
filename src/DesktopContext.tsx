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
            title:'Note - Todos 1',
            content: 'Lorem Ipsum dolor Santis est',
            defaultPosition: {x:31, y: 24},
            width: '190px',
            zIndex: 4,
            isHidden: false,
        },
        {
            type: 'note',
            id: 1,
            title:'Note - Todos 2',
            content: 'Lorem Ipsum dolor Santis est',
            defaultPosition: {x:51, y: 44},
            width: '190px',
            zIndex: 3,
            isHidden: false,
        },
        {
            type: 'note',
            id: 2,
            title:'Note - Todos 3',
            content: 'Lorem Ipsum dolor Santis est',
            defaultPosition: {x:71, y: 64},
            width: '190px',
            zIndex: 2,
            isHidden: false,
        },
        {
            type: 'about',
            id: 3,
            title:'About Me',
            defaultPosition: {x:95, y: 95},
            width: '375px',
            zIndex: 1,
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