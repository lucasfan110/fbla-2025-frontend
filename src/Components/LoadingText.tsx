import { useEffect, useState } from "react";

/**
 * Time (in ms) per animation tick
 */
const ANIMATION_INTERVAL = 700;

interface Props {
    animated?: boolean;
}

export default function LoadingText({ animated = false }: Props) {
    const [dots, setDots] = useState("...");

    useEffect(() => {
        if (!animated) {
            return;
        }

        const timerId = setInterval(() => {
            setDots(d => ".".repeat((d.length % 3) + 1));
        }, ANIMATION_INTERVAL);

        return () => {
            clearInterval(timerId);
        };
    }, [animated]);

    return (
        <div className="u-gray-text" style={{ textAlign: "center" }}>
            Loading{dots}
        </div>
    );
}
