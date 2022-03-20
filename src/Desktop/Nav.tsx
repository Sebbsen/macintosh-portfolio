import { useEffect, useState } from "react";
import './Nav.scss'

import logo from '../icons/apple-logo.svg';
import logoWhite from '../icons/apple-white-logo.svg';
import helpIcon from '../icons/help-icon.svg';
import helpWhiteIcon from '../icons/help-white-icon.svg';
import systemIcon from '../icons/system-icon.svg';
import systemWhiteIcon from '../icons/system-white-icon.svg';

type NavProps = {
    currentWindow: string
}

export const Nav = ({ currentWindow }: NavProps) => {
    
    const windowChanged = () => {
        console.log(currentWindow);
    }
    
    useEffect(() => {
        windowChanged();
    }, [currentWindow])


    return (
        <nav className="nav headline">
            <div className="nav__section">
                <button className="nav__item button">
                    <img src={logo} className="inactive" alt="apple-logo" />
                    <img src={logoWhite} className="active" alt="apple-logo" />
                </button>
                <button className="nav__item button">File</button>
                <button className="nav__item button">Edit</button>
                <button className="nav__item button">view</button>
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

