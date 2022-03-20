import { useEffect, useState } from "react";
import './DragDrop.scss'

type DragDropProps = {
    innerComponent: object,
    desktopRef: object,
}

export const DragDrop = ({ desktopRef, innerComponent }: DragDropProps) => {

    const [position, setPosition] = useState({x: 62, y: 47})
    const [isDragging, setIsDragging] = useState(false)
    const [desktopBounding, setDesktopBounding] = useState({})
    const [mouseOld, setMouseOld] = useState({x: 0, y: 0})

    const style = {
        width: '184px',
        transform: `translate(${position.x}px, ${position.y}px)`
    };


    const drag = (e) => {
        const currentDesktopBounding = desktopRef.current.getBoundingClientRect()
        setDesktopBounding(currentDesktopBounding);
        
        setMouseOld({
            x: e.clientX - currentDesktopBounding.left,
            y: e.clientY - currentDesktopBounding.top
        })
        setIsDragging(true)
    }
    
    const drop = (e) => {
        setIsDragging(false)       
    }

    const handleDrag = (e) => {
        const mouseNewX = e.clientX - desktopBounding.left
        const mouseNewY = e.clientY - desktopBounding.top
        
        const MouseChangedX = mouseNewX - mouseOld.x
        const MouseChangedY = mouseNewY - mouseOld.y
        
        const objNewX = position.x + MouseChangedX
        const objNewY = position.y + MouseChangedY
        
        setPosition({x:objNewX, y:objNewY})
    }
    
    useEffect(() => {
        if (isDragging) desktopRef.current.addEventListener("mousemove", handleDrag);
        else desktopRef.current.removeEventListener("mousemove", handleDrag);
        return () => desktopRef.current.removeEventListener("mousemove", handleDrag);
    }, [isDragging])


    return (
        <div className="drag-drop" style={style} onMouseDown={ drag } onMouseUp={ drop }>
            {innerComponent}
        </div>
    )
}