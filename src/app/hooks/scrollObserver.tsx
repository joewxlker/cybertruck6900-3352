import { useState } from "react";

export const useScrollObserver = () => {

    const [inView, setInView] = useState<boolean>(false);
    
    const initialize = (element: HTMLDivElement | null) => {
        if(element){
            const observer = new IntersectionObserver(handleIntersection, {
                root: null,
                rootMargin: "200px",
                threshold: 0.9,
            });
            observer.observe(element);
        }
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0]
        if(entry){
            setInView(entry.isIntersecting)};
        }

    return { initialize, inView };
}