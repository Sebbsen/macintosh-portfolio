import { useEffect, useState } from "react";
import './Nav.scss'

import { useDesktopContext } from "../DesktopContext";
import helpIcon from '../icons/help-icon.svg';
import helpWhiteIcon from '../icons/help-white-icon.svg';
import systemIcon from '../icons/system-icon.svg';
import systemWhiteIcon from '../icons/system-white-icon.svg';
import note from '../icons/note-icon.svg';
import noteWhite from '../icons/note-white-icon.svg';
import game from '../icons/game-icon.svg';
import gameWhite from '../icons/game-white-icon.svg';
import threeD from '../icons/3d-icon.svg';
import threeDWhite from '../icons/3d-white-icon.svg';
import { NavDropdownItem } from "./NavDropdownItem";

type NavProps = {
    currentWindow: string
}

export const Nav = ({ currentWindow }: NavProps) => {
    // @ts-ignore: Type '{}' must have a '[Symbol.iterator]()' method that returns an iterator
    const {windowsState, addWindow, openWindow, removeWindow, resetDesktop} = useDesktopContext();
    
    const windowChanged = () => {
        console.log(currentWindow);
    }
    
    useEffect(() => {
        windowChanged();
    }, [currentWindow])

    const activeWindowId = windowsState.filter((window: any) => window.zIndex === windowsState.length)[0]?.id

    return (
        <nav className="nav headline">
            <div className="nav__section">
                <NavDropdownItem 
                    title="Logo" 
                    list={[
                        {icon: undefined, text: 'About Me', action: () => openWindow('about'), active: true},
                        {icon: undefined, text: '---', active: true},
                        {icon: {normal: note, white: noteWhite}, text: 'Note', action: () => openWindow('note'), active: true},
                        {icon: {normal: threeD, white: threeDWhite}, text: 'Future Shit', active: false},
                        {icon: {normal: game, white: gameWhite}, text: 'Game', active: false},
                    ]}
                />
                <NavDropdownItem 
                    title="File" 
                    list={[
                        {icon: undefined, text: 'Add Note', action: () => addWindow('note'), active: true},
                        {icon: undefined, text: 'Delete Note', action: () => removeWindow(activeWindowId), active: true},
                        {icon: undefined, text: 'Copy Note', active: false},
                        {icon: undefined, text: '---', active: true},
                        {icon: undefined, text: 'Print', active: false},
                    ]}
                />
                <NavDropdownItem 
                    title="Edit" 
                    list={[
                        {icon: undefined, text: 'Reset Desktop', action: () => resetDesktop('about'), active: true},
                        {icon: undefined, text: 'Select All', active: false},
                    ]}
                />
                <NavDropdownItem 
                    title="View" 
                    list={[
                        {icon: undefined, text: 'Close Window', active: true},
                        {icon: undefined, text: 'Maximize', active: false},
                    ]}
                />
                <NavDropdownItem 
                    title="Portfolio" 
                    list={[
                        {icon: undefined, text: 'Alcina', active: true},
                        {icon: undefined, text: 'Bette', active: true},
                        {icon: undefined, text: 'Audi BKK', active: true},
                    ]}
                />
            </div>
            <div className="nav__section nav__section--right">
                <button className="nav__item nav__item--icon button">
                    <img src={helpIcon} className="inactive" alt="help icon" />
                    <img src={helpWhiteIcon} className="active" alt="help icon" />
                </button>
                <button className="nav__item nav__item--icon button">
                    <img src={systemIcon} className="inactive" alt="system icon" />
                    <img src={systemWhiteIcon} className="active" alt="system icon" />
                </button>
            </div>
        </nav>
    )
}

