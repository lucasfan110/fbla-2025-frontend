import { useEffect, useState } from "react";

/**
 * Time (in ms) per animation tick
 */
const ANIMATION_INTERVAL = 700;

interface Props {
    animated?: boolean;
    customText?: string;
}

export default function LoadingText({
    animated = true,
    customText = "Loading",
}: Props) {
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
            {customText}
            {dots}
        </div>
    );
}
