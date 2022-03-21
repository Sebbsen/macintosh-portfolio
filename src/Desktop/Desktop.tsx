import { useRef, useState } from "react";
import { Nav } from "./Nav"
import './Desktop.scss'
import { WindowFrame } from "./Window/WindowFrame"
import { DragDrop } from "./DragDrop"
import { AboutMeContent } from "./AboutMeContent";

export const Desktop = () => {
    const desktopMainRef = useRef(null);

    const [activeWindow, setActiveWindow] = useState(2)

    const handleActiveWindow = (id: number) => {
        setActiveWindow(id);
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
                    innerComponent={<WindowFrame title="Note - Todos1" content="Lorem Ipsum dolor Santis est" active={activeWindow === 1} width="189px" />}
                    active={activeWindow === 1}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(1)}
                    dragAreaFromTop={20}
                />
                <DragDrop 
                    defaultPosition={{x:89, y: 90}} 
                    desktopRef={desktopMainRef} 
                    innerComponent={<WindowFrame title="About Me" content={<AboutMeContent />} active={activeWindow === 2} width="375px" />}
                    active={activeWindow === 2}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(2)}
                    dragAreaFromTop={20}
                />
            </main>
        </div>
    )
}