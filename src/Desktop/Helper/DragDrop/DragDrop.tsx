import { useEffect, useState, useRef } from "react";
import './DragDrop.scss'

type DragDropProps = {
    innerComponent: object,
    desktopRef: any,
    defaultPosition: {x: number,y: number},
    zIndex: number,
    onMouseDownHandleActiveWindow:()=>void,
    dragAreaFromTop: number | boolean,
    isHidden: boolean,
}

export const DragDrop = ({ desktopRef, innerComponent, defaultPosition, zIndex, onMouseDownHandleActiveWindow, dragAreaFromTop, isHidden }: DragDropProps) => {
    const dragDropRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({x: defaultPosition.x, y: defaultPosition.y})
    const [isDragging, setIsDragging] = useState(false)
    const [desktopBounding, setDesktopBounding] = useState({left: 0, top: 0})
    const [mouseOld, setMouseOld] = useState({x: 0, y: 0})

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: zIndex,
        display: isHidden ? 'none': 'block'
    };


    const drag = (e: any) => {
        onMouseDownHandleActiveWindow();
        
        if (dragAreaFromTop && dragDropRef.current) {
            const mouseToDragelemnt = e.clientY - dragDropRef.current.getBoundingClientRect().top

            if (mouseToDragelemnt > dragAreaFromTop) {
                return
            }
        }
        
        const currentDesktopBounding = desktopRef.current.getBoundingClientRect()
        setDesktopBounding(currentDesktopBounding)
        
        setMouseOld({
            x: e.clientX - currentDesktopBounding.left,
            y: e.clientY - currentDesktopBounding.top
        })
        setIsDragging(true)
    }
    
    const drop = () => {
        setIsDragging(false)       
    }

    const handleDrag = (e: any) => {
        const mouseNewX = e.clientX - desktopBounding.left
        const mouseNewY = e.clientY - desktopBounding.top

        const MouseChangedX = mouseNewX - mouseOld.x
        const MouseChangedY = mouseNewY - mouseOld.y
        
        const objNewX = position.x + MouseChangedX
        const objNewY = position.y + MouseChangedY
        
        setPosition({x:objNewX, y:objNewY})

        handleOverflow(mouseNewX, mouseNewY)
    }

    const handleOverflow = (mouseNewX: number, mouseNewY: number) => {
        if (
            mouseNewX < 0 || 
            mouseNewX > desktopRef.current.offsetWidth ||
            mouseNewY < 0 || 
            mouseNewY > desktopRef.current.offsetHeight
            ) {
            
            drop()
        }
    }
    
    useEffect(() => {
        if (isDragging) desktopRef.current.addEventListener("mousemove", handleDrag);
        else desktopRef.current.removeEventListener("mousemove", handleDrag);
        return () => desktopRef.current.removeEventListener("mousemove", handleDrag);
    }, [isDragging])


    return (
        <div ref={dragDropRef} className="drag-drop" style={style} onMouseDown={ drag } onMouseUp={ drop }>
            {innerComponent}
        </div>
    )
}