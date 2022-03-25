import { useEffect, useState } from "react";
import './NoteContent.scss'

type NoteContentProps = {
    defaultText: string
}

export const NoteContent = ({ defaultText }: NoteContentProps) => {

    const [textareaValue, setTextareaValue] = useState(defaultText);
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [defaultText])


    return (
        <div className="note-content" contentEditable="true" dangerouslySetInnerHTML={{__html: textareaValue}}></div>
    )
}