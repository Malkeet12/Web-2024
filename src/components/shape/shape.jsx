import { useMemo, useRef, useState, useEffect } from "react";
import "./index.scss"
// Use this data to create the shape
const BOX_DATA = [
    [1, 0, 1],
    [1, 0, 0],
    [1, 1, 1],
];

export function Shape() {
    const boxes = useMemo(() => BOX_DATA.flat(), []);

    const [selected, setSelected] = useState(new Set());
    const [isRollingBack, setIsRollingBack] = useState(false);
    const intervalId = useRef(null);

    const totalVisibleBoxes = useMemo(() => {
        return boxes.filter(box => box === 1).length;
    }, [boxes]);

    useEffect(() => {
        if (!isRollingBack) return;

        intervalId.current = setInterval(() => {
            setSelected(prevSelected => {
                const selectedArray = Array.from(prevSelected).reverse();
                const newSelected = new Set(prevSelected);
                newSelected.delete(selectedArray[0]);

                if (newSelected.size === 0) {
                    setIsRollingBack(false);
                    clearInterval(intervalId.current); // Clear the interval before setting it to null
                    intervalId.current = null;
                }

                return newSelected;
            });
        }, 300);

        return () => {
            clearInterval(intervalId.current);
        };
    }, [isRollingBack]);

    const handleSelect = (index) => {
        if (isRollingBack) return;
        const key = `index-${index}`;

        setSelected(prevSelected => {
            const newSelected = new Set(prevSelected);
            newSelected.add(key);

            if (newSelected.size === totalVisibleBoxes) {
                setIsRollingBack(true);
            }

            return newSelected;
        });
    };

    return (
        <main>
            {boxes.map((value, index) => {
                const key = `index-${index}`;
                return (
                    <div
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`box ${value ? "" : "hidden"} ${selected.has(key) ? "selected" : ""}`}
                    >
                    </div>
                );
            })}
        </main>
    );
}
