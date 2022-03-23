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
        // @ts-ignore: Property 'maxlength' does not exist on type 
        <textarea className="note-content" maxlength="133">{defaultText}</textarea>
    )
}