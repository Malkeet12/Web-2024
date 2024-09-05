
import { useState } from "react"
import "./index.scss"
import { useEffect } from "react";
const Progress = ({ start, updateFilledCount }) => {
    const [startTransition, setStartTransition] = useState(false);
    useEffect(() => {
        if (!start || startTransition) return
        setStartTransition(true)
    }, [start, startTransition])

    return <div className="progress">
        <div onTransitionEnd={updateFilledCount} className={`filled ${startTransition ? "animating" : ""}`}></div>
    </div>
}
const LIMIT = 3
export const ProgressbarContainer = () => {
    const [bars, setBars] = useState(0)
    const [filledCount, setFilledCount] = useState(0)

    const onAdd = () => {
        setBars(count => count + 1)
    }
    return (
        <div>
            <button onClick={onAdd}>Add</button>
            <div className="bars">
                {new Array(bars).fill(null).map((bar, index) => (
                    <Progress
                        updateFilledCount={() => {
                            return setFilledCount(count => count + 1);
                        }}
                        start={filledCount + LIMIT > index}
                        key={index} />))}
            </div>
        </div>
    )
}
