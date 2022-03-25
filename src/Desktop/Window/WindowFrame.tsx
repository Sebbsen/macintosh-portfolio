import { useEffect, useState } from "react";
import './WindowFrame.scss'

type WindowFrameProps = {
    active: boolean,
    title: string,
    content: string | object,
    width: string,
    height?: string,
    editable: boolean,
    onHandleCloseWindow: ()=>void,
}

export const WindowFrame = ({ active, title, content, width, height, onHandleCloseWindow, editable }: WindowFrameProps) => {

    const [varName, setVarName] = useState('defaultValue');
    
    const style = {
        width: width,
    };
    const styleMain = {
        height: height,
    };
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [title])


    return (
        <section className={"window-frame " + (active ? '' : 'window-frame--inactive')} style={style}>
            <header className="window-frame__header">
                <button className="button window-frame__btn" onClick={onHandleCloseWindow}></button>
                <h2 className="headline window-frame__title" contentEditable={editable}>{title}</h2>
                <button className="button window-frame__btn window-frame__btn--size"></button>
            </header>
            <main className="window-frame__main custom-scrollbar" style={styleMain}>
                {content}
            </main>
        </section>
    )
}