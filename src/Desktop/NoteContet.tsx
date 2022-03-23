import { useEffect, useState } from "react";
import './NoteContent.scss'

type NoteContentProps = {
    defaultText: string
}

export const NoteContent = ({ defaultText }: NoteContentProps) => {

    const [varName, setVarName] = useState('defaultValue');
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [defaultText])


    return (

        <textarea className="note-content" maxLength={133}>{defaultText}</textarea>
    )
}