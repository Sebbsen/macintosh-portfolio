import { useEffect, useState } from "react";
import './Myname.scss'

type MynameProps = {
    propName: string
}

export const Myname = ({ propName }: MynameProps) => {

    const [varName, setVarName] = useState('defaultValue');
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [propName])


    return (
        <div className="myname">

        </div>
    )
}