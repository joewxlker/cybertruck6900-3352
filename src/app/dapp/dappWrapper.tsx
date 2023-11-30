"use client"

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { type FC, type ReactNode } from "react";
import { CHAIN_ID } from "./constants";

export const DappWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThirdwebProvider activeChain={CHAIN_ID} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
            {children}
        </ThirdwebProvider>
    )
}