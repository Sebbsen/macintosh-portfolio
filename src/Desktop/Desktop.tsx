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
            defaultPosition: {x:31, y: 24}
        },
        {
            type: 'about',
            id: 1,
            defaultPosition: {x:95, y: 95}
        }
    ]

    const [windowsState, setWindowsState] = useState(defaultWindows)

    const handleActiveWindow = (id: number) => {
        const windowArray = [...windowsState];
        const first = windowArray.filter(window => window.id === id)[0];
        windowArray.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
        setWindowsState(windowArray);
    }

    return (
        <div className="desktop">
            <header className="desktop__header">
                <Nav currentWindow="Note" />
            </header>
            <main ref={desktopMainRef} className="desktop__main">
                <DragDrop
                    defaultPosition={{x:31, y: 24}} 
                    desktopRef={desktopMainRef} 
                    innerComponent={<WindowFrame title="Note - Todos1" content="Lorem Ipsum dolor Santis est" active={windowsState.findIndex(window => window.id === 0) === 0} width="189px" />}
                    zIndex={windowsState.length - windowsState.findIndex(window => window.id === 0)}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(0)}
                    dragAreaFromTop={20}
                />
                <DragDrop 
                    defaultPosition={{x:95, y: 95}} 
                    desktopRef={desktopMainRef} 
                    innerComponent={<WindowFrame title="About Me" content={<AboutMeContent />} active={windowsState.findIndex(window => window.id === 1) === 0} width="375px" />}
                    zIndex={windowsState.length - windowsState.findIndex(window => window.id === 1)}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(1)}
                    dragAreaFromTop={20}
                />
            </main>
        </div>
    )
}