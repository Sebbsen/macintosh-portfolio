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
            zIndex: 2, 
        },
        {
            type: 'about',
            id: 1,
            defaultPosition: {x:95, y: 95},
            width: '375px',
            zIndex: 1, 
        }
    ]

    const [windowsState, setWindowsState] = useState(defaultWindows)

    const handleActiveWindow = (id: number) => {
        const windowArray = [...windowsState];
        const reformattedArray = windowsState.map(singleWindow => {
            let newZIndex;

            if (singleWindow.id === id) {
                newZIndex = windowsState.length;  
            } else {
                newZIndex = singleWindow.zIndex !== 1 ? singleWindow.zIndex - 1 : 1;
            }

            singleWindow.zIndex = newZIndex;

            return singleWindow;
        });
        setWindowsState(windowArray);
    }

    return (
        <div className="desktop">
            <header className="desktop__header">
                <Nav currentWindow="Note" />
            </header>
            <main ref={desktopMainRef} className="desktop__main">

                {windowsState.map((window, i) => {
                    let {type, id, title, content, defaultPosition, width, zIndex} = window;
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
                            innerComponent={<WindowFrame title={title} content={windowElement} active={zIndex === windowsState.length} width={width} />}
                            zIndex={zIndex}
                            onMouseDownHandleActiveWindow={() => handleActiveWindow(id)}
                            dragAreaFromTop={20}
                        />
                    )
                }
                )}
            </main>
        </div>
    )
}