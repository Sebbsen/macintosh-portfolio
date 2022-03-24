import { useRef, useState } from "react";
import './Desktop.scss'

import { useDesktopContext } from "../DesktopContext";
import { Nav } from "./Nav"
import { WindowFrame } from "./Window/WindowFrame"
import { DragDrop } from "./DragDrop"
import { AboutMeContent } from "./AboutMeContent";
import { NoteContent } from "./NoteContet";

export const Desktop = () => {
    const desktopMainRef = useRef(null);
    // @ts-ignore: Type '{}' must have a '[Symbol.iterator]()' method that returns an iterator
    const {windowsState, handleActiveWindow, handleCloseWindow} = useDesktopContext();

    return (
        <div className="desktop">
            <header className="desktop__header">
                <Nav currentWindow="Note" />
            </header>
            <main ref={desktopMainRef} className="desktop__main">

                {windowsState.map((singleWindow:any) => {
                    const {type, id, title, content, defaultPosition, width, zIndex, isHidden} = singleWindow;
                    let windowElement;
                    if (type === 'note') {
                        windowElement = <NoteContent defaultText={content} />
                    } else if (type === 'about') {
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