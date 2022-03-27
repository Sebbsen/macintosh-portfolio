import React, { useEffect, useContext, useState } from "react";
import { mobileCheck } from "./utils";

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
            id: 100001,
            title:'Note - Todos',
            content: '- <s>Add DragDrop</s> <br />- <s>Add Note</s> <br />- <s>Add About Me</s> <br />- Implement game <br />- Add 3D model <br />- Safe state local',
            defaultPosition: {x:31, y: 24},
            width: '190px',
            height: '145px',
            zIndex: 1,
            isHidden: false,
        },
        {
            type: 'about',
            id: 100002,
            title:'About Me',
            defaultPosition: {x:95, y: 95},
            width: '375px',
            zIndex: 2,
            isHidden: false,
        }
    ]

    const [windowsState, setWindowsState] = useState(defaultWindows)
    const [newWindowPosition, setNewWindowPosition] = useState({x: 41,y: 34})

    useEffect(() => {
        if (mobileCheck()){
            addWindow('mobilenote')
        }
    }, [])

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
        let currentWindowZIndex = windowArray[windowArray.findIndex((singleWindow => singleWindow.id == id))].zIndex;
        windowArray = windowArray.filter(e=>e.id != id).map(singleWindow => {
            if ( singleWindow.zIndex > currentWindowZIndex) {
                singleWindow.zIndex --;
                return singleWindow
            }

            return singleWindow
        });
        
        setWindowsState(windowArray);
    }

    const addWindow = (type: string) => {
        if (windowsState.length > 25) {
            return
        }

        let specificWindow;
        const basicWindow = {
            type: 'basic',
            id: Math.floor(100000 + Math.random() * 900000),
            title:'Basic Window',
            content: 'Basic Window',
            defaultPosition: {x:newWindowPosition.x, y: newWindowPosition.y},
            width: '190px',
            zIndex: windowsState.length + 1,
            isHidden: false,
        }

        if(type === 'note') {
            specificWindow = {
                type: 'note',
                title:'Note - MyNote',
                content: '',
                width: '190px',
                height: '145px',
            }
        } else if(type === 'mobilenote') {
            specificWindow = {
                type: 'note',
                id: 999999,
                title:'Use Desktop',
                content: 'This page is optimised for the desktop. Feel free to try it out in Chrome or any other modern browser. Just please not in IE',
                width: '190px',
                height: '145px',
            }
        } else if(type === 'about') {
            specificWindow = {
                type: 'about',
                title:'About Me',
                width: '375px',
            }
        }
        setNewWindowPosition({x: newWindowPosition.x + 10, y: newWindowPosition.y + 10})
        const newWindow = {...basicWindow, ...specificWindow}

        setWindowsState([...windowsState, newWindow])
    }

    const removeWindow = (id: number) => {
        setWindowsState(windowsState.filter(e=>e.id !== id));
    }

    const openWindow = (type: string) => {
        const windowsOfType = windowsState.filter(e => e.type === type)
        
        if (windowsOfType.length > 0) {
            const highestZindexOfType = Math.max(...windowsOfType.map(e => e.zIndex));
            const windowsOfTypeHighest = windowsOfType.filter(e => e.zIndex === highestZindexOfType)[0];
            handleActiveWindow(windowsOfTypeHighest.id)
        } else {
            addWindow(type);
        }
    }

    const changeWindowValue = (id: number, key: any, value: string | number) => {
        let windowArray = [...windowsState];
        windowArray[windowArray.findIndex((singleWindow => singleWindow.id == id))][key] = value;
        setWindowsState(windowArray)
    }

    return (
        <DesktopContext.Provider value={{windowsState, handleActiveWindow, handleCloseWindow, addWindow, removeWindow, openWindow, changeWindowValue}}>
            {childern}
        </DesktopContext.Provider>
    )

}