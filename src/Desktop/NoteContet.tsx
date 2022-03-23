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

        <textarea className="note-content" maxLength={133} defaultValue={textareaValue}></textarea>
    )
}