import { useEffect, useState } from "react";
import './WindowFrame.scss'

import { useDesktopContext } from "../../DesktopContext";

type WindowFrameProps = {
    active: boolean,
    title: string,
    content: string | object,
    width: string,
    height?: string,
    editable: boolean,
    id: number,
    onHandleCloseWindow: ()=>void,
}

export const WindowFrame = ({ active, title, content, width, height, onHandleCloseWindow, editable, id }: WindowFrameProps) => {

    const [varName, setVarName] = useState('defaultValue');
    // @ts-ignore: Property 'changeWindowValue' does not exist on type '{}'
    const {changeWindowValue} = useDesktopContext();

    
    const style = {
        width: width,
    };
    const styleMain = {
        height: height,
    };
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [title])

    const saveContent = (e: any) => {
        changeWindowValue(id, 'title', e.target.innerHTML)
    }

    const preventBullshit = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        } else if (e.target.innerText.length > 14 && e.keyCode != 8) {
            e.preventDefault();
        }
    }


    return (
        <section className={"window-frame " + (active ? '' : 'window-frame--inactive')} style={style}>
            <header className="window-frame__header">
                <button className="button window-frame__btn" onClick={onHandleCloseWindow}></button>
                <h2 className="headline window-frame__title" contentEditable={editable} suppressContentEditableWarning={true} onBlur={saveContent} onKeyDown={preventBullshit} onPaste={(e)=>{e.preventDefault()}}>{title}</h2>
                <button className="button window-frame__btn window-frame__btn--size"></button>
            </header>
            <main className="window-frame__main custom-scrollbar" style={styleMain}>
                {content}
            </main>
        </section>
    )
}