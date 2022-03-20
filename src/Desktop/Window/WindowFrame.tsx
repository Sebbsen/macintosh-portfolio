import { useEffect, useState } from "react";
import './WindowFrame.scss'

type WindowFrameProps = {
    active: boolean,
    title: string,
    content: string
}

export const WindowFrame = ({ active, title, content }: WindowFrameProps) => {

    const [varName, setVarName] = useState('defaultValue');
    
    const style = {
        width: '184px',
    };
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [title])


    return (
        <section className={"window-frame " + (active ? '' : 'window-frame--inactive')} style={style}>
            <header className="window-frame__header">
                <button className="button window-frame__btn"></button>
                <h2 className="headline window-frame__title">{title}</h2>
                <button className="button window-frame__btn window-frame__btn--size"></button>
            </header>
            <main className="window-frame__main">
                {content}
            </main>
        </section>
    )
}