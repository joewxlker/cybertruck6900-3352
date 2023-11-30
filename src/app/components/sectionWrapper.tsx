"use client"

import { type FC, type ReactNode, useRef, useEffect } from "react";
import { useScrollObserver } from "../hooks/scrollObserver"

export const SectionWrapper: FC<{ children: ReactNode, layout: string}> = ({ children, layout }) => {
    
    const ref = useRef<HTMLDivElement | null>(null);
    const { initialize, inView } = useScrollObserver();

    useEffect(() => {
        initialize(ref.current);
    }, [ref, initialize]);

    return (
        <div className={`${!inView && 'opacity-0'} ${inView && 'opacity-100'} w-screen ${layout} transition-opacity duration-500`} ref={ref}>
            {children}
        </div>
    )
}