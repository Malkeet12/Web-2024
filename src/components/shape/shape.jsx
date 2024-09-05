import { useMemo, useRef, useState, useEffect } from "react";


// Use this data to create the shape
const BOX_DATA = [
    [1, 0, 1],
    [1, 0, 0],
    [1, 1, 1],
];

export default function App() {
    const boxes = useMemo(() => BOX_DATA.flat(Infinity), [])

    const [selected, setSelected] = useState(new Set());
    const [rollingBack, setRollingBack] = useState(false);
    const intervalId = useRef(null);

    const countofVisibleBoxes = useMemo(() => {
        return boxes.reduce((acc, box) => {
            if (box === 1) {
                acc += 1;
            }
            return acc
        }, 0)
    }, [boxes])

    useEffect(() => {
        if (!rollingBack) return;

        intervalId.current = setInterval(() => {
            setSelected((prevObject) => {
                const arr = new Array(...prevObject.keys()).reverse();
                const clone = new Set(prevObject);
                clone.delete(arr[0]);

                if (clone.size === 0) {
                    setRollingBack(false);
                    clearInterval(intervalId.current); // Clear the interval before setting it to null
                    intervalId.current = null;
                }

                return clone;
            });
        }, 300);

        return () => {
            clearInterval(intervalId.current);
        };
    }, [rollingBack]);

    const onSelect = (r) => {
        if (rollingBack) return
        const key = `index-${r}`
        const clone = new Set(selected)
        clone.add(key)

        if (clone.size === countofVisibleBoxes) {
            setRollingBack(true)
        }
        setSelected(clone)
    }

    return <main >
        {boxes.map((val, row) => {
            const key = `index-${row}`
            return (<div key={row}
                onClick={() => onSelect(row)}
                className={`box ${val ? "" : "hidden"} ${selected.has(key) ? "selected" : ""}`}>
            </div>)
        })}
    </main>
}
