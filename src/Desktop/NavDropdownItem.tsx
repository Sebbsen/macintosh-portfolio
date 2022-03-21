import { useEffect, useState } from "react";
import logo from '../icons/apple-logo.svg';
import logoWhite from '../icons/apple-white-logo.svg';
import './NavDropdownItem.scss'

type NavDropdownItemProps = {
    title: string,
    list: {icon: {normal: string, white: string, } | undefined, text: string, active: boolean}[]
}

export const NavDropdownItem = ({ title, list }: NavDropdownItemProps) => {

    const [varName, setVarName] = useState('defaultValue');
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [title])


    return (
        <button className="nav__item nav-dropdown-item button">
            {title === 'Logo' &&
                <span>
                    <img src={logo} className="inactive" alt="apple-logo" />
                    <img src={logoWhite} className="active" alt="apple-logo" />
                </span>
                ||
                <span>{title}</span>
            }

            <div className="nav-dropdown-item__dropdown">
                {list.map((item) => {
                    if (item.text === '---') {
                        return (<hr />)
                    } 
                    return (
                            <button className={"button nav-dropdown-item__dropdown-btn " + (!item.active ? 'nav-dropdown-item__dropdown-btn--inactive' : '')}>
                                {item.icon &&
                                    <span>
                                        <img src={item.icon?.normal} className="icon-inactive" alt="" />
                                        <img src={item.icon?.white} className="icon-active" alt="" />
                                    </span>
                                }
                                {item.text}
                            </button>
                        )
                }
                )}
            </div>
        </button>
    )
}