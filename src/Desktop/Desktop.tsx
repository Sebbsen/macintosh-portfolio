import { Nav } from "./Nav"
import './Desktop.scss'
import { WindowFrame } from "./Window/WindowFrame"

export const Desktop = () => {
    return (
        <div className="desktop">
            <Nav currentWindow="Note" />
            <WindowFrame title="Note - Todos" content="Lorem Ipsum dolor Santis est" active={true} />
        </div>
    )
}