import Image from "next/image";
import { type FC, useCallback } from "react";

interface DappHeaderProps {
    onDisconnect: () => void;
    address?: string;
}
export const DappHeaderComponent: FC<DappHeaderProps> = ({ address, onDisconnect }) => {
    const disconnect = useCallback(() => onDisconnect(), [onDisconnect]);
    return (
        <div className='w-full py-2 flex px-2 flex-row items-center gap-5 justify-between'>
            <Image src='/logo-nobg100px.png' alt='' height={50} width={50} />
            <div className='flex flex-row gap-2'>
                <div className="flex flex-row items-center rounded bg-b1 shadow-black shadow-sm p-2">
                    <p className='text-white text-xl font-body'>{address?.slice(0,10)}...{address?.slice(38,50)}</p>
                </div>
                {address && <button onClick={disconnect} className='p-2 shadow-black shadow-sm rounded bg-b1 flex justify-center items-center opacity-50 hover:opacity-100 duration-300 transition-opacity'>
                    <Image src='/icons/on.svg' alt='' height={20} width={20} />
                </button>}
            </div>
        </div>
    )
}