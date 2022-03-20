import { useRef } from "react";
import { Nav } from "./Nav"
import './Desktop.scss'
import { WindowFrame } from "./Window/WindowFrame"
import { DragDrop } from "./DragDrop"

export const Desktop = () => {

    const desktopMainRef = useRef(null);

    return (
        <div className="desktop">
            <header className="desktop__header">
                <Nav currentWindow="Note" />
            </header>
            <main ref={desktopMainRef} className="desktop__main">
                <DragDrop desktopRef={desktopMainRef} innerComponent={<WindowFrame title="Note - Todos" content="Lorem Ipsum dolor Santis est" active={true} />} />
            </main>
        </div>
    )
}