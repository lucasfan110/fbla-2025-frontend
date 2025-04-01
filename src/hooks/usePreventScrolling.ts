import { useEffect } from "react";

export default function usePreventScrolling(preventScrolling: boolean) {
    useEffect(() => {
        const overflow = preventScrolling ? "hidden" : "visible";
        document.body.style.overflowY = overflow;
    }, [preventScrolling]);
}
