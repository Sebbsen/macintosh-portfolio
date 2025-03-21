import { useRef, useState } from "react";
import './Desktop.scss'

import { useDesktopContext } from "../DesktopContext";
import { Nav } from "./Nav/Nav"
import { WindowFrame } from "@/Desktop/WindowFrame/WindowFrame"
import { DragDrop } from "./Helper/DragDrop/DragDrop"
import { AboutMeContent } from "./Windows/AboutMeContent/AboutMeContent";
import { NoteContent } from "./Windows/NoteContet/NoteContet";

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
                    const {type, id, title, content, defaultPosition, width, height, zIndex, isHidden} = singleWindow;
                    let windowElement;
                    let editable = false;
                    if (type === 'note') {
                        windowElement = <NoteContent defaultText={content} id={id} />
                        editable = true;
                    } else if (type === 'about') {
                        windowElement = <AboutMeContent />
                    } else {
                        return
                    }

                    return (
                        <DragDrop 
                            defaultPosition={{x:defaultPosition.x, y: defaultPosition.y}} 
                            desktopRef={desktopMainRef} 
                            innerComponent={<WindowFrame title={title} content={windowElement} active={zIndex === windowsState.length} width={width} height={height} editable={editable} id={id} onHandleCloseWindow={() => handleCloseWindow(id)} />}
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