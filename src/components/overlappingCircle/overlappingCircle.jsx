import { useState } from "react"
import "./index.scss"
import { useEffect } from "react";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color)
    return color;
};

// const elementsOverlap = (rect1, rect2) => {
//     const collide = !(
//         rect1.top > rect2.bottom ||
//         rect1.right < rect2.left ||
//         rect1.bottom < rect2.top ||
//         rect1.left > rect2.right
//     );

//     return collide;
// };

const circlesOverlap = (circle1, circle2) => {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const res = distance <= 200;
    return res
};

export const OverlappingCircle = () => {
    const [circles, setCircles] = useState([])

    // useEffect(() => {
    //     document.addEventListener("click", draw);
    //     return () => {
    //         document.removeEventListener("click", draw);
    //     };
    // }, []);

    const draw = (event) => {
        const { clientX, clientY } = event;

        setCircles(prev => {
            const current = {
                top: clientY - 100,
                left: clientX - 100,
                right: clientX + 100,
                bottom: clientY + 100,
                background: "red",
                x: clientX,
                y: clientY
            };
            for (let i = 0; i < prev.length; i++) {
                if (circlesOverlap(current, prev[i])) {
                    current.background = getRandomColor();
                    break;
                }
            }

            return [...prev, current];

        })
    }
    return <div onClick={draw} className="circles">
        {circles.map(({ left, top, right, bottom, background }, index) => {
            return <div
                key={index}
                style={{ left: left, top: top, bottom: bottom, right: right, backgroundColor: background }}
                className="circle"
            >
            </div>
        })
        }
    </div>
}
