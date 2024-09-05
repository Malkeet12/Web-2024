
import { useState } from "react"
import "./indexhard.scss"
import { useEffect } from "react";
import { useRef } from "react";
const Progress = ({ start, value = 50 }) => {
    const [startTransition, setStartTransition] = useState(false);
    useEffect(() => {
        if (!start || startTransition) return
        setStartTransition(true)
    }, [start, startTransition])

    return <div className="progress">
        <div style={{ width: `${value}%` }} className={`filled ${startTransition ? "animating" : ""}`}></div>
    </div>
}
const LIMIT = 3
export const ProgressbarContainer = () => {
    const [bars, setBars] = useState([])
    const [isProgressing, setIsProgressing] = useState(false)
    const [timerId, setTimerId] = useState(null)

    const onStart = () => {
        let timerId = setInterval(() => {
            setBars(prev => {
                const nonFullBars = prev
                    .map((value, index) => ({ value, index }))
                    .filter(({ value }) => value < 100);
                if (nonFullBars.length === 0) {
                    return prev;
                }
                const barsToIncrement = nonFullBars.slice(
                    0,
                    LIMIT,
                );
                const newProgression = prev.slice();
                for (const { index } of barsToIncrement) {
                    newProgression[index] += 0.5;
                }
                return newProgression;
            })
        }, 10);
        setTimerId(timerId)
    }

    const onAdd = () => {
        setBars(bars => {
            const clone = [...bars]
            clone.push(0)
            return clone;
        })
    }
    const onPause = () => {
        clearInterval(timerId)
        setTimerId(null)
    }

    return (
        <div>
            <button onClick={onAdd}>Add</button>
            <button onClick={() => {
                if (isProgressing) {
                    onPause()
                } else {
                    onStart()
                }
                return setIsProgressing(isProgressing => !isProgressing);
            }}>{isProgressing ? "Pause" : "Start"}</button>
            <button onClick={() => setBars([])}>Reset</button>
            <div className="bars">
                {bars.map((bar, index) => (
                    <Progress
                        value={bar}
                        key={index}
                    />))}
            </div>
        </div>
    )
}
