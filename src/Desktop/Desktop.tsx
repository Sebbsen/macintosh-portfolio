import { useRef, useState } from "react";
import { Nav } from "./Nav"
import './Desktop.scss'
import { WindowFrame } from "./Window/WindowFrame"
import { DragDrop } from "./DragDrop"

export const Desktop = () => {
    const desktopMainRef = useRef(null);

    const [activeWindow, setActiveWindow] = useState(1)

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
                    defaultPosition={{x:62, y: 42}} 
                    desktopRef={desktopMainRef} 
                    innerComponent={<WindowFrame title="Note - Todos1" content="Lorem Ipsum dolor Santis est" active={activeWindow === 1} />}
                    active={activeWindow === 1}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(1)}
                    dragAreaFromTop={20}
                />
                <DragDrop 
                    defaultPosition={{x:82, y: 62}} 
                    desktopRef={desktopMainRef} 
                    innerComponent={<WindowFrame title="Note - Todos2" content="Lorem Ipsum dolor Santis est" active={activeWindow === 2} />}
                    active={activeWindow === 2}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(2)}
                    dragAreaFromTop={20}
                />
                <DragDrop 
                    defaultPosition={{x:102, y: 82}} 
                    desktopRef={desktopMainRef} 
                    innerComponent={<WindowFrame title="Note - Todos3" content="Lorem Ipsum dolor Santis est" active={activeWindow === 3} />}
                    active={activeWindow === 3}
                    onMouseDownHandleActiveWindow={() => handleActiveWindow(3)}
                    dragAreaFromTop={20}
                />
            </main>
        </div>
    )
}