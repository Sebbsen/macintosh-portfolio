import { useEffect, useState } from "react";
import './NoteContent.scss'

import { useDesktopContext } from "../DesktopContext";

type NoteContentProps = {
    defaultText: string,
    id: number
}

export const NoteContent = ({ defaultText, id }: NoteContentProps) => {

    const [textareaValue, setTextareaValue] = useState(defaultText);
    // @ts-ignore: Property 'changeWindowValue' does not exist on type '{}'
    const {changeWindowValue} = useDesktopContext();
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [defaultText])

    const saveContent = (e: any) => {
        changeWindowValue(id, 'content', e.target.innerHTML)
    }

    const preventBullshit = (e: any) => {
        if (e.target.innerText.length > 500 && e.keyCode != 8) {
            e.preventDefault();
        }
    }


    return (
        <div className="note-content" contentEditable="true" suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: textareaValue}} onBlur={saveContent} onKeyDown={preventBullshit} onPaste={(e)=>{e.preventDefault()}}></div>
    )
}