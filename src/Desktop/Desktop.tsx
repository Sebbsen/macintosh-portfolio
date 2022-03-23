import { useRef, useState } from "react";
import { Nav } from "./Nav"
import './Desktop.scss'
import { WindowFrame } from "./Window/WindowFrame"
import { DragDrop } from "./DragDrop"
import { AboutMeContent } from "./AboutMeContent";

export const Desktop = () => {
    const desktopMainRef = useRef(null);

    const [windowsStateactiveWindow, setActiveWindow] = useState(2)

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
        windowArray[windowArray.findIndex((singleWindow => singleWindow.id == id))].isHidden = true;
        setWindowsState(windowArray);
    }

    return (
        <div className="desktop">
            <header className="desktop__header">
                <Nav currentWindow="Note" />
            </header>
            <main ref={desktopMainRef} className="desktop__main">

                {windowsState.map((window, i) => {
                    const {type, id, title, content, defaultPosition, width, zIndex, isHidden} = window;
                    let windowElement;
                    if (window.type === 'note') {
                        windowElement = 'Lorem Ipsum' //needs own NoteContent component
                    } else if (window.type === 'about') {
                        windowElement = <AboutMeContent />
                    } else {
                        return
                    }

                    return (
                        <DragDrop 
                            defaultPosition={{x:defaultPosition.x, y: defaultPosition.y}} 
                            desktopRef={desktopMainRef} 
                            innerComponent={<WindowFrame title={title} content={windowElement} active={zIndex === windowsState.length} width={width} onHandleCloseWindow={() => handleCloseWindow(id)} />}
                            zIndex={zIndex}
                            onMouseDownHandleActiveWindow={() => handleActiveWindow(id)}
                            dragAreaFromTop={20}
                            isHidden={isHidden}
                        />
                    )
                }
                )}
            </main>
        </div>
    )
}